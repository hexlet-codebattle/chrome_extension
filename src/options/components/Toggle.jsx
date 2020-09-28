/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import ContextApp from './ContextApp';


export default ({ text, name }) => {
  const { state, dispatch } = useContext(ContextApp);
  const checked = state.toggles[name];
  const handleChange = () => {
    dispatch({
      type: 'setToggle',
      payload: { [name]: !checked },
    });
  };
  return (
    <div className="custom-control custom-switch pb-2">
      <input
        type="checkbox"
        className="custom-control-input"
        defaultChecked={checked}
        onChange={handleChange}
        id={text}
      />
      <label className="custom-control-label" htmlFor={text}>{text}</label>
    </div>
  );
};
