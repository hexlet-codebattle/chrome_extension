import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { animateBadge, setBadge } from './actions';

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

const state$ = new BehaviorSubject(initialState);
const state = () => state$.getValue();
const updateState = value => {
  console.log('updateStateValue', value);
  state$.next({
    ...state(),
    ...value,
  });
};


const allState$ = state$.pipe(
  distinctUntilChanged(),
);
allState$.subscribe(console.log);

const activeGames$ = state$.pipe(
  map(el => el.games.active_games),
  distinctUntilChanged(),
);

activeGames$.subscribe(games => {
  setBadge(games.length);
});

const infoGameState = state$.pipe(
  map(el => el.info.game.state),
  distinctUntilChanged(),
);

infoGameState.subscribe(gameState => {
  if (gameState === 'waiting_opponent') {
    animateBadge();
  }
});

export { state, updateState };
