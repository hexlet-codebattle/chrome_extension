// @ts-check

import { ReplaySubject, Subject, BehaviorSubject } from 'rxjs';
import {
  tap,
  scan,
  startWith,
} from 'rxjs/operators';
import { animateBadge, setNotification, setBadge } from './browser-actions';
import gameStatuses from './models';

const activeGames$ = new BehaviorSubject([]);

const onUpdate = action => {
  if (action.type === 'update') {
    const { state: gameStatus } = action.payload;

    if (gameStatus === gameStatuses.waiting) {
      animateBadge();
      setNotification();
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
  action = { type: '', payload: null },
) => {
  const state = activeGames$;
  const { type, payload } = action;
  const value = activeGames$.getValue();
  switch (type) {
    case 'add': {
      state.next([...value, ...payload]);
      break;
    }
    case 'remove': {
      const { id } = payload;
      if (!id) {
        throw new Error(`Unexpected payload type: ${payload}`);
      }
      state.next(value.filter(game => game.id !== id));
      break;
    }
    case 'update': {
      const { id } = payload;
      if (!id) {
        throw new Error(`Unexpected payload type: ${payload}`);
      }
      const currentGame = value.find(game => game.id === payload.id);
      if (currentGame) {
        state.next(value.map(game => (game.id === id ? payload : game)));
        break;
      }
      state.next([...value, payload]);
      break;
    }
    default:
      throw new Error(`Unexpected type: ${type}`);
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
);

// FIXME: move out state from actions pipe
const activeGamesActions$ = new ReplaySubject(1);

const activeGamesChanges$ = activeGamesActions$.pipe(
  tap(gamesStateReducer),
);

const actions$ = new Subject();

actions$.subscribe(message => {
  const { type, payload } = message;
  const [reducer, action] = type.split(':');
  switch (reducer) {
    case 'games': {
      activeGamesActions$.next({ type: action, payload });
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

activeGamesChanges$
  .pipe(
    tap(onUpdate),
  ).subscribe();
activeGames$
  .pipe(
    tap(showWaitingGamesAmount),
  )
  .subscribe();

export {
  userState$,
  activeGames$,
  actions$,
};
