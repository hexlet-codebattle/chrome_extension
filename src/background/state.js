import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { animateBadge, setBadge } from './actions';

export default initialState => {
  const state$ = new BehaviorSubject(initialState);
  const getState = () => state$.getValue();
  const updateState = value => {
    console.log('updateStateValue', value);
    state$.next({
      ...getState(),
      ...value,
    });
  };

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
  return { getState, updateState };
};
