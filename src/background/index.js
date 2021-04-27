import browser from 'webextension-polyfill';
import { combineLatest, Subject } from 'rxjs';
import axios from 'axios';
import socketConnect from './socket';
import { activeGames$, userState$, actions$ } from './state';
import { handleOnButtonClicked } from './notification';

const message$ = new Subject();
const serverUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : 'https://codebattle.hexlet.io/';
const socketUrl = process.env.NODE_ENV === 'development'
  ? 'ws://localhost:4000/extension/websocket?vsn=2.0.0'
  : 'wss://codebattle.hexlet.io/extension/websocket?vsn=2.0.0';

const setUser = () => browser.cookies.get({ name: '_codebattle_key', url: serverUrl });
setUser()
  .then(() => axios.get(`${serverUrl}/api/v1/user/current`, { withCredentials: true }))
  .then(({ data: { id } }) => axios.get(`${serverUrl}/api/v1/user/${id}/stats`, { withCredentials: true }))
  .then(({ data }) => actions$.next({ type: 'user:update', payload: data }))
  .catch(err => console.error(err));

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
            popup.postMessage({ games: { active_games: activeGames }, info: userState });
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
socketConnect(socketUrl);
