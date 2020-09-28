
import ReactDOM from 'react-dom';
import React from 'react';
import './options.scss';
import App from './components/App';


function restoreOptions() {
  const defaultStorage = {
    toggles: {
      flashing: true,
      notification: true,
    },
    popupTheme: 'white',
  };
  window.chrome.storage.sync.get(defaultStorage, storage => {
    console.log('options.jsx', storage);
    ReactDOM.render(<App storage={storage} />, document.getElementById('root'));
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
