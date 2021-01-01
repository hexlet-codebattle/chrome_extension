import browser from 'webextension-polyfill';
import { combineLatest, Subject } from 'rxjs';
import socketConnect from './socket';
import { activeGames$, userState$, actions$ } from './state';
import { handleOnButtonClicked } from './notification';

const message$ = new Subject();
const setUser = () => browser.cookies.get({ name: '_codebattle_key', url: 'https://codebattle.hexlet.io/' });
setUser().then(cookie => {
  actions$.next({ type: 'user:update', payload: { key: cookie.value } });
});

browser.runtime.onConnect.addListener(popup => {
  let connected = true;

  popup.onMessage.addListener(msg => {
    message$.next(msg);
  });

  const state = combineLatest([activeGames$, userState$, message$])
    .subscribe(([activeGames, userState, message]) => {
      if (connected) {
        switch (message.action) {
          case 'getState': {
            popup.postMessage({ games: { active_games: activeGames }, user: userState });
            break;
          }
          default:
            throw new Error(`Unexpected message action: ${message.action}`);
        }
      }
    });

  popup.onDisconnect.addListener(() => {
    connected = false;
    state.unsubscribe();
  });
});
browser.notifications.onButtonClicked.addListener(handleOnButtonClicked);
socketConnect('wss://codebattle.hexlet.io/extension/websocket?vsn=2.0.0');
