/* eslint-disable camelcase */

const socketConnect = ((url, useState, socket = new WebSocket(url)) => {
  const { getState, updateState } = useState;
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
      console.log('Current State = ', getState());
      console.log('Message1 = ', message);
      try {
        switch (phx_reply) {
          case 'phx_reply': {
            const activeGames = info.response.active_games.filter(game => !game.is_bot);
            updateState({
              games: { active_games: activeGames },
            });
            break;
          }
          case 'game:upsert': {
            if (!info.game.is_bot) {
              const { game: { id } } = info;
              const currentGames = getState().games.active_games.filter(game => game.id !== id);
              const activeGames = [...currentGames, info.game];
              updateState({
                games: { active_games: activeGames },
                info,
              });
            }
            break;
          }
          case 'game:finish': {
            const { game: { id } } = info;
            const activeGames = getState().games.active_games.filter(game => game.id !== id);
            updateState({
              games: { active_games: activeGames },
            });
            break;
          }
          case 'game:remove': {
            const { id } = info;
            const activeGames = getState().games.active_games.filter(game => game.id !== id);
            updateState({
              games: { active_games: activeGames },
            });
            break;
          }
          default:
            throw new Error(`Unexpected response type: ${phx_reply}`);
        }
      } catch (err) {
        console.log(`Error in bg: ${err}`);
      }
    }
    console.log('Next State = ', getState());
  };
  socket.onerror = error => { console.log('WS got error = ', error); };
  socket.onclose = dsc => { console.log('WS disconnected ', dsc); };
});

export default socketConnect;
