/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default ({ description, checked, handleChange }) => (
  <div className="custom-control custom-switch pb-2">
    <input
      type="checkbox"
      className="custom-control-input"
      defaultChecked={checked}
      onChange={handleChange}
      id={description}
    />
    <label className="custom-control-label" htmlFor={description}>{description}</label>
  </div>
);
