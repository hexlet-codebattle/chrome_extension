import browser from 'webextension-polyfill';

const newGame = {
  type: 'list',
  title: 'Primary Title',
  message: 'Primary message to display',
  iconUrl: '../assets/128.png',
  items: [{ title: 'Item1', message: 'This is item 1.' },
    { title: 'Item2', message: 'This is item 2.' },
    { title: 'Item3', message: 'This is item 3.' }],
  buttons: [],
};

const opponentEntered = {
  type: 'basic',
  message: 'Opponent has entered the game',
  iconUrl: '../assets/128.png',
  eventTime: 23,
  buttons: [
    {
      title: 'Close button',
    },
  ],
};

const newTournament = {
  type: 'basic',
  message: 'New tournament has begun',
  iconUrl: '../assets/128.png',
  eventTime: 23,
  buttons: [
    {
      title: 'Close button',
    },
  ],
};

export { newGame, opponentEntered, newTournament };
