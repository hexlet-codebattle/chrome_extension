/* eslint-disable camelcase */

import browser from 'webextension-polyfill';

const setBadge = number => (number > 0
  ? browser.browserAction.setBadgeText({ text: `${number}` })
  : browser.browserAction.setBadgeText({ text: null }));

const stopFlashingBadge = id => {
  clearInterval(id);
  browser.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
  browser.browserAction.setTitle({ title: 'CodeBattle webExtension' });
  console.log('stopinterval', 'stopinterval   ', id);
};
const flashBadge = () => {
  let flashing = true;
  browser.browserAction.setTitle({ title: 'CodeBattle webExtension: new game available' });
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
  const timerId = flashBadge();
  setTimeout(() => {
    console.log('animateBadge -> setTimeout', setTimeout);
    stopFlashingBadge(timerId);
  }, timeout);
};
export { setBadge, flashBadge, animateBadge };
