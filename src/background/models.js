//! Module for all models

export const gameStatuses = {
  waiting: 'waiting_opponent',
  joined: 'joined',
  finished: 'finished',
  removed: 'removed',
};
const newGame = {
  type: 'basic',
  title: 'New game available',
  message: 'Primary message to display',
  iconUrl: 'assets/128.png',
  buttons: [
    {
      title: 'Join',
    },
  ],
};

const opponentJoin = {
  type: 'basic',
  message: 'Opponent has join the game',
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

export const notifications = { newGame, opponentJoin, newTournament };
