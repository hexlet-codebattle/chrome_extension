import browser from 'webextension-polyfill';

export default async (id, options, message, gameID) => {
  const currentOptions = { ...options, message };
  const createdNotificationId = await browser.notifications.create(id, currentOptions);
  const handleOnButtonClicked = (clickedNotificationId, index) => {
    if (createdNotificationId !== clickedNotificationId) {
      return;
    }
    if (currentOptions.buttons[index].title === 'Join') {
      const link = `https://codebattle.hexlet.io/games/${gameID}`;
      window.open(link, '_blank');
    }
  };
  browser.notifications.onButtonClicked.addListener(handleOnButtonClicked);

  const handleOnClosed = () => {
    browser.notifications.onButtonClicked.removeListener(handleOnButtonClicked);
    browser.notifications.onClosed.removeListener(handleOnClosed);
  };
  browser.notifications.onClosed.addListener(handleOnClosed);
};
