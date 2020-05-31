const browser = require('webextension-polyfill');

const socket = new WebSocket('wss://codebattle.hexlet.io/extension/websocket?vsn=2.0.0');
let popup;
const postMessage = msg => popup && popup.postMessage(msg);
const state = {
  games: {
    active_games: [],
    live_tournaments: [],
  },
};
browser.runtime.onConnect.addListener(port => {
  console.log('Connected to port = ', port);
  console.assert(port.name === 'backend');
  popup = port;

  popup.onMessage.addListener(msg => {
    if (msg.action === 'getState') {
      popup.postMessage({ state });
    }
  });
  popup.onDisconnect.addListener(dsc => {
    console.log('Port disconnected = ', dsc);
    popup = null;
  });
});

const getLobby = () => socket.send(JSON.stringify(['7', '7', 'lobby', 'phx_join', {}]));
const ping = () => socket.send(JSON.stringify([null, '8', 'phoenix', 'heartbeat', {}]));

socket.onopen = function () {
  setInterval(ping, 6000);
  getLobby();
};
socket.onmessage = function (event) {
  const message = JSON.parse(event.data);
  const [, , channel, phx_reply, info] = message;
  if (channel === 'lobby') {
    try {
      switch (phx_reply) {
        case 'phx_reply': {
          const { active_games } = info.response;

          console.log('Info = ', info);
          state.games = info.response;
          browser.browserAction.setBadgeText({ text: `${active_games.length}` });
          postMessage({ state });
          break;
        }
        case 'game:upsert': {
          state.games.active_games.push(info.game);
          browser.browserAction.setBadgeText({ text: `${state.games.active_games.length}` });
          postMessage({ state });
          break;
        }
        case 'game:finish':
        case 'game:remove': {
          const { id } = info;
          state.games.active_games = state.games.active_games.filter(game => game.id !== id);
          browser.browserAction.setBadgeText({ text: `${state.games.active_games.length}` });
          postMessage({ state });
          break;
        }
        default:
          throw new Error(`Unexpected response type: ${phx_reply}`);
      }
    } catch (err) {
      console.log(`Error in bg: ${err}`);
    }
  }
};
socket.onerror = function (error) { console.log('WS got error = ', error); };
socket.onclose = function (dsc) { console.log('WS disconnected ', dsc); };
