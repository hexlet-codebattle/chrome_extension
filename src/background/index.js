
import background from './background';
import socketConnect from './socket';
import createState from './state';

export default () => {
  const initialState = {
    games: { active_games: [] },
    user: {},
    info: {
      game: {
        state: '',
      },
    },
    badgeFlashTimerId: null,
  };
  const useState = createState(initialState);
  background(useState);
  socketConnect('wss://codebattle.hexlet.io/extension/websocket?vsn=2.0.0', useState);
};
