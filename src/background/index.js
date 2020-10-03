import browser from 'webextension-polyfill';
import socketConnect from './socket';
import { getState } from './state';

browser.runtime.onConnect.addListener(popup => {
  popup.onMessage.addListener(msg => {
    console.log('onConnect.msg', msg);
    switch (msg.action) {
      case 'getState': {
        popup.postMessage(getState());
        break;
      }
      default:
        throw new Error(`Unexpected message action: ${msg.action}`);
    }
  });

  popup.onDisconnect.addListener(dsc => {
    console.log('Port disconnected = ', dsc);
  });
});

socketConnect('wss://codebattle.hexlet.io/extension/websocket?vsn=2.0.0');
