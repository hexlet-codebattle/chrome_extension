
import ReactDOM from 'react-dom';
import React from 'react';
import './options.scss';
import App from './components/App';
import defaultStorage from './defaultStorage';


function restoreOptions() {
  window.chrome.storage.sync.get(defaultStorage, storage => {
    console.log('options.jsx', storage);
    ReactDOM.render(<App storage={storage} />, document.getElementById('root'));
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
