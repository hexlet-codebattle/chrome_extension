import browser from 'webextension-polyfill';
import WS from 'jest-websocket-mock';
import socketConnect from '../src/background/socket';
import { gameStatuses } from '../src/background/models';
import phxReply4bots from '../__fixtures__/phxReply4bots';
import getUpdateResponseWithID from '../__fixtures__/getUpdateResponse';
import getRemoveResponseWithID from '../__fixtures__/getRemoveResponse';

let serverWS = null;
beforeEach(async () => {
  jest.clearAllMocks();
  serverWS = new WS('ws://localhost:1234');
  serverWS.on('connection', socket => {
    socket.on('message', data => {
      switch (data) {
        case ['7', '7', 'lobby', 'phx_join', {}]:
          serverWS.send(phxReply4bots);
          break;
        case [null, '8', 'phoenix', 'heartbeat', {}]:
          serverWS.send([null, '8', 'phoenix', 'heartbeat', {}]);
          break;
        default:
          break;
      }
    });
  });
  socketConnect('ws://localhost:1234');
  await serverWS.connected;
});

afterEach(() => {
  WS.clean();
});

describe('socket', () => {
  test('phxReply', () => {
    expect(browser.browserAction.setBadgeText).toHaveBeenCalledTimes(0);
    serverWS.send(phxReply4bots);
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: null,
    });
  });
  test('add games->remove games', () => {
    expect(browser.browserAction.setBadgeText).toHaveBeenCalledTimes(0);
    serverWS.send(getUpdateResponseWithID(1000, gameStatuses.waiting));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: '1',
    });
    serverWS.send(getUpdateResponseWithID(1001, gameStatuses.waiting));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: '2',
    });
    serverWS.send(getRemoveResponseWithID(1001));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: '1',
    });
    serverWS.send(getRemoveResponseWithID(1000));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: null,
    });
  });
  test('add game -> changeStatus', () => {
    expect(browser.browserAction.setBadgeText).toHaveBeenCalledTimes(0);
    serverWS.send(getUpdateResponseWithID(1002, gameStatuses.waiting));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: '1',
    });
    serverWS.send(getUpdateResponseWithID(1002, gameStatuses.joined));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: null,
    });
    expect(browser.browserAction.setBadgeText).toHaveBeenCalledTimes(2);
  });

  test('add game -> notification called', () => {
    expect(browser.notifications.create).toHaveBeenCalledTimes(0);
    serverWS.send(getUpdateResponseWithID(1002, gameStatuses.waiting));
    expect(browser.notifications.create).toHaveBeenCalledTimes(1);
    serverWS.send(getUpdateResponseWithID(1003, gameStatuses.waiting));
    expect(browser.notifications.create).toHaveBeenCalledTimes(2);
    serverWS.send(getUpdateResponseWithID(1004, gameStatuses.waiting));
    expect(browser.notifications.create).toHaveBeenCalledTimes(3);
  });
});
