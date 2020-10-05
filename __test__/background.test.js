import browser from 'webextension-polyfill';
import socketConnect from '../src/background/socket';
import gameStatuses from '../src/background/models';
import phxReply4bots from '../__fixtures__/phxReply4bots';
import getUpdateResponseWithID from '../__fixtures__/getUpdateResponse';
import getRemoveResponseWithID from '../__fixtures__/getRemoveResponse';

describe('socket', () => {
  const fakeSocket = {};
  socketConnect(('wss://codebattle.hexlet.io/extension/websocket?vsn=2.0.0'), fakeSocket);

  test('phxReply', () => {
    fakeSocket.onmessage(phxReply4bots);
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: null,
    });
  });
  test('add games->remove games', () => {
    fakeSocket.onmessage(getUpdateResponseWithID(1000, gameStatuses.waiting));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: '1',
    });
    fakeSocket.onmessage(getUpdateResponseWithID(1001, gameStatuses.waiting));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: '2',
    });
    fakeSocket.onmessage(getRemoveResponseWithID(1001));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: '1',
    });
    fakeSocket.onmessage(getRemoveResponseWithID(1000));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: null,
    });
  });
  test('add game -> changeStatus', () => {
    fakeSocket.onmessage(getUpdateResponseWithID(1002, gameStatuses.waiting));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: '1',
    });
    fakeSocket.onmessage(getUpdateResponseWithID(1002, gameStatuses.joined));
    expect(browser.browserAction.setBadgeText).toHaveBeenLastCalledWith({
      text: null,
    });
  });
});
