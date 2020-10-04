// @ts-check

import { ReplaySubject, Subject, BehaviorSubject } from 'rxjs';
import {
  tap,
  scan,
  startWith,
} from 'rxjs/operators';
import { animateBadge, setBadge } from './browser-actions';
import gameStatuses from './models';
import Notification from './notification';

const onUpdate = action => {
  if (action.type === 'update') {
    const { state: gameStatus } = action.payload;

    if (gameStatus === gameStatuses.waiting) {
      animateBadge();
      const notification = new Notification();
      notification.addListener();
    }
  }
};
const showWaitingGamesAmount = games => {
  const waitingGames = games.filter(game => game.state === 'waiting_opponent');
  if (waitingGames.length > 0) {
    setBadge(waitingGames.length);
  } else {
    setBadge('');
  }
};
const initialState = {
  games: { active_games: [] },
  user: {
    score: null,
    login: null,
  },
  game: {
    id: null,
    state: null,
  },
};
const userStateReducer = (state = initialState.user, action = { type: '', payload: {} }) => {
  switch (action.type) {
    case 'add':
    case 'delete':
    case 'update':
    default:
      return state;
  }
};
// const userGameStateReducer = (state = initialState.game, action = { type: '', payload: {} }) => {
//   switch (action.type) {
//     case 'add':
//     case 'delete':
//     case 'update':
//     default:
//       return state;
//   }
// };
const gamesStateReducer = (
  state = initialState.games.active_games,
  action = { type: '', payload: null },
) => {
  const { type, payload } = action;
  switch (type) {
    case 'add': {
      return [...state, ...payload];
    }
    case 'remove': {
      const { id } = payload;
      if (!id) {
        throw new Error(`Unexpected payload type: ${payload}`);
      }
      return state.filter(game => game.id !== id);
    }
    case 'update': {
      const { id } = payload;
      if (!id) {
        throw new Error(`Unexpected payload type: ${payload}`);
      }
      const currentGame = state.find(game => game.id === payload.id);
      if (currentGame) {
        return state.map(game => (game.id === id ? payload : game));
      }
      return [...state, payload];
    }
    default:
      return state;
  }
};
// const badgeStateManager = (action = { type: '', payload: {}}) => {
//   switch(action.type) {
//     case 'add': {

//       break;
//     }
//     case '': {
//       break;
//     }
//     case 'add': {
//       break;
//     }
//   }
// }
const userActions$ = new ReplaySubject(1);
const userState$ = userActions$.pipe(
  startWith(initialState.user),
  scan(userStateReducer),
  tap(changes => console.log('User info Changes = ', changes)),
);

// FIXME: move out state from actions pipe
const gamesActions$ = new BehaviorSubject({});
const activeGames$ = gamesActions$.pipe(
  startWith(initialState.games.active_games),
  tap(action => console.log('Action = ', action)),
  tap(onUpdate),
  scan(gamesStateReducer),
  tap(showWaitingGamesAmount),
  tap(changes => console.log('Active Games info Changes = ', changes)),
);


const actions$ = new Subject();
actions$.subscribe(message => {
  const { type, payload } = message;
  const [reducer, action] = type.split(':');
  switch (reducer) {
    case 'games': {
      gamesActions$.next({ type: action, payload });
      break;
    }
    case 'game':
    case 'user': {
      break;
    }
    default:
      throw new Error(`Unexpected reducer type: ${reducer}`);
  }
});

activeGames$.subscribe();

export {
  userState$,
  activeGames$,
  actions$,
};
