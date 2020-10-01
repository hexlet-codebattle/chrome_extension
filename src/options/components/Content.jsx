
import React from 'react';
import SelectMenu from './SelectMenu';
import Toggle from './Toggle';

const themes = ['white', 'black'];

const Title = () => (
  <div className="row pb-4">
    <h1 className="col text-center">
      <div className="mb-2">
        <img src="../../assets/128.png" className="img-fluid" height="50px" width="50px" alt="Logo" />
      </div>
      <div className="h4">CodeBattle Extension Options</div>
    </h1>
  </div>
);

const Body = () => (
  <form className="h5">
    <Toggle
      name="flashing"
      text="Blink when a new game is added"
    />
    <Toggle
      name="notification"
      text="Display notification"
    />
    <br />
    <SelectMenu
      name="popupTheme"
      text="Pop-up Menu Theme:"
      options={themes}
    />
    <br />
  </form>
);

const Content = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-8 col-lg-6 mx-auto mt-5 bg-white border p-4 rounded">
        <Title />
        <Body />
      </div>
    </div>
  </div>
);

export default Content;
