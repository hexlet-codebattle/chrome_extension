/* eslint-disable camelcase */
import browser from 'webextension-polyfill';
import socketConnect from './socket';
import { state } from './state';

browser.runtime.onConnect.addListener(port => {
  let popup;
  popup = port;
  popup.onMessage.addListener(msg => {
    if (msg.action === 'getState') {
      popup.postMessage({ ...state() });
    }
  });
  popup.onDisconnect.addListener(dsc => {
    console.log('Port disconnected = ', dsc);
    popup = null;
  });
});

socketConnect('wss://codebattle.hexlet.io/extension/websocket?vsn=2.0.0');
