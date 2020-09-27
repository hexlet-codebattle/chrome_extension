/* eslint-disable camelcase */
import browser from 'webextension-polyfill';

export default useState => {
  const { getState } = useState;
  browser.runtime.onConnect.addListener(port => {
    let popup;
    popup = port;
    popup.onMessage.addListener(msg => {
      if (msg.action === 'getState') {
        popup.postMessage({ ...getState() });
      }
    });
    popup.onDisconnect.addListener(dsc => {
      console.log('Port disconnected = ', dsc);
      popup = null;
    });
  });
};
