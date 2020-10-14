/* eslint-disable camelcase */
import browser from 'webextension-polyfill';
import defaultStorage from '../options/defaultStorage';
import createNotification from './notification';
import { notifications } from './models';

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
        stopFlashingBadge(timerId);
      }, timeout);
    }
  });
};

const showNotification = (notification, message, gameID) => {
  window.chrome.storage.sync.get(defaultStorage, storage => {
    if (storage.toggles.showNotifications[notification]) {
      createNotification(gameID.toString(), notifications[notification], message);
    } else {
      throw new Error('Unexpected notification type = ', notification);
    }
  });
};

export {
  setBadge, flashBadge, animateBadge, showNotification,
};
