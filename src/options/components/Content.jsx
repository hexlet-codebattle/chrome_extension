
import React from 'react';
import SelectMenu from './SelectMenu';
import Toggle from './Toggle';

const themes = ['white', 'black'];
const Title = () => (
  <div className="row pb-4">
    <h1 className="col h4 text-center">
      <div href="" className="align-end">
        <img src="../../assets/128.png" width="50px" alt="Logo" />
        <span className="">Codebattle</span>
      </div>
      <div className="">CodeBattle Extension Options</div>
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
  <div className="vh-100 pt-5">
    <div className="content border mx-auto p-4 rounded">
      <Title />
      <Body />
    </div>
  </div>
);

export default Content;
