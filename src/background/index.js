
import browser from 'webextension-polyfill';
import { combineLatest } from 'rxjs';
import socketConnect from './socket';
import { activeGames$, userState$ } from './state';

combineLatest([activeGames$, userState$])
  .subscribe(([activeGames, userState]) => {
    browser.runtime.onConnect.addListener(popup => {
      popup.onMessage.addListener(msg => {
        if (msg.action === 'getState') {
          popup.postMessage({ games: { active_games: activeGames }, user: userState });
        }
      });
      popup.onDisconnect.addListener(dsc => {
        console.log('Port disconnected = ', dsc);
      });
    });
  });
socketConnect('wss://codebattle.hexlet.io/extension/websocket?vsn=2.0.0');
