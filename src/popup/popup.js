/* eslint-disable react/jsx-filename-extension */
import ReactDOM from 'react-dom';
import React from 'react';
import browser from 'webextension-polyfill';
import App from './components/App';

const background = browser.runtime.connect({ name: 'backend' });

background.postMessage({ action: 'getState' });
background.onMessage.addListener(state => {
  console.log('Msg from backend = ', state);
  ReactDOM.render(<App state={state} />, document.getElementById('root'));
});
browser.runtime.onMessage.addListener(msg => {
  console.log('MSG from onMessage listener ', msg);
});
