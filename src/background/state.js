// @ts-check

import { ReplaySubject, Subject } from 'rxjs';
import {
  tap,
  scan,
  startWith,
} from 'rxjs/operators';
import { animateBadge, setBadge } from './browser-actions';

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
// const badgeFlashReducer = (state = initialState.badgeFlashTimerId, action = { type: ''}) => {
//   switch(action.type) {
//     case 'activate': {
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

const gamesActions$ = new ReplaySubject(1);
const activeGames$ = gamesActions$.pipe(
  startWith(initialState.games.active_games),
  tap(action => console.log('Action = ', action)),
  scan(gamesStateReducer),
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

activeGames$.subscribe(games => {
  setBadge(games.length);
  const freeGame = games.find(game => game.state === 'waiting_opponent');
  if (freeGame) {
    animateBadge();
  }
});

export {
  userState$,
  activeGames$,
  actions$,
};
