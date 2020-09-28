
import React, { useContext } from 'react';
import ContextApp from './ContextApp';

const SelectMenu = ({ options, name, text }) => {
  const { state, dispatch } = useContext(ContextApp);
  const handleChange = event => {
    dispatch({
      type: 'setTheme',
      payload: { [name]: event.target.value },
    });
  };
  return (
    <>
      <div className="pb-2">{text}</div>
      <select className="custom-select pb-2" value={state.popupTheme} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={`${option}${index.toString()}`} value={option}>{option}</option>
        ))}
      </select>
    </>
  );
};

export default SelectMenu;
