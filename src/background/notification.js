import browser from 'webextension-polyfill';

let currentOptions;

export const handleOnButtonClicked = (clickedNotificationId, index) => {
  if (currentOptions.buttons[index].title === 'Join') {
    const link = `https://codebattle.hexlet.io/games/${clickedNotificationId}`;
    window.open(link, '_blank');
  }
};

export default async (id, options, message) => {
  currentOptions = { ...options, message };
  const createdNotificationID = await browser.notifications.create(id, currentOptions);
  return createdNotificationID;
};
