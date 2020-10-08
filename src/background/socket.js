/* eslint-disable camelcase */
// @ts-check
import { actions$ } from './state';

const socketConnect = (url, socket = new WebSocket(url)) => {
  const getLobby = () => socket.send(JSON.stringify(['7', '7', 'lobby', 'phx_join', {}]));
  const ping = () => socket.send(JSON.stringify([null, '8', 'phoenix', 'heartbeat', {}]));

  socket.onopen = () => {
    setInterval(ping, 6000);
    getLobby();
  };

  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    const [, , channel, phx_reply, info] = message;
    if (channel === 'lobby') {
      try {
        switch (phx_reply) {
          case 'phx_reply': {
            const activeGames = info.response.active_games.filter(game => !game.is_bot);
            actions$.next({ type: 'games:add', payload: activeGames });
            break;
          }
          // emits when added new game
          case 'game:upsert': {
            if (!info.game.is_bot) {
              actions$.next({ type: 'games:update', payload: info.game });
            }
            break;
          }
          case 'game:remove':
          case 'game:finish': {
            const id = info.game ? info.game.id : info.id;
            actions$.next({ type: 'games:remove', payload: { id } });
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
  socket.onerror = error => { console.log('WS got error = ', error); };
  socket.onclose = dsc => { console.log('WS disconnected ', dsc); };
};

export default socketConnect;
