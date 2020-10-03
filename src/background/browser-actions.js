/* eslint-disable camelcase */
import browser from 'webextension-polyfill';
import Notification from './notification';

const defaultStorage = {
  toggles: {
    flashing: true,
    notification: true,
  },
  popupTheme: 'white',
};

const setBadge = number => (number > 0
  ? browser.browserAction.setBadgeText({ text: `${number}` })
  : browser.browserAction.setBadgeText({ text: null }));

const stopFlashingBadge = id => {
  clearInterval(id);
  browser.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
};

const flashBadge = () => {
  let flashing = true;
  const flash = () => {
    if (flashing) {
      browser.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
    } else {
      browser.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });
    }
    flashing = !flashing;
  };
  const badgeFlashTimerId = setInterval(flash, 500);
  return badgeFlashTimerId;
};

const animateBadge = (timeout = 10000) => {
  window.chrome.storage.sync.get(defaultStorage, storage => {
    console.log('animateBadge', storage);
    if (storage.toggles.flashing) {
      const timerId = flashBadge();
      setTimeout(() => {
        console.log('animateBadge -> setTimeout', setTimeout);
        stopFlashingBadge(timerId);
      }, timeout);
    }
  });
};

const setNotification = () => {
  window.chrome.storage.sync.get(defaultStorage, storage => {
    console.log('setNotification', storage);
    if (storage.toggles.notification) {
      const notification = new Notification();
      notification.addListener();
    }
  });
};

export {
  setBadge, flashBadge, animateBadge, setNotification,
};
