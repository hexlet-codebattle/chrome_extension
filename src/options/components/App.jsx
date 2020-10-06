
import React, { useEffect, useReducer } from 'react';
import Content from './Content';
import ContextApp from './ContextApp';
import reducer from '../reducer';

const App = ({ storage }) => {
  const initialState = { ...storage };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    window.chrome.storage.sync.set(state);
  }, [state]);
  return (
    <ContextApp.Provider value={{ state, dispatch }}>
      <Content />
    </ContextApp.Provider>
  );
};

export default App;
