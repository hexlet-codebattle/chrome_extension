
import React, { useContext } from 'react';
import ContextApp from './ContextApp';
import GroupToggles from './GroupToggles';
import SelectMenu from './SelectMenu';
import Toggle from './Toggle';

const themes = ['white', 'black'];
const description = {
  flashing: 'Blink when a new game added',
  newGame: 'new game added',
  newTournament: 'new tournament created',
  opponentJoin: 'opponent join',
};
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

const Body = () => {
  const { state, dispatch } = useContext(ContextApp);
  const { flashing, showNotifications } = state.toggles;
  console.log('%c%s', 'color: #00a3cc', JSON.stringify(showNotifications));

  const handleChangeSetToggle = (name, checked) => () => {
    dispatch({
      type: 'setToggle',
      payload: { [name]: !checked },
    });
  };
  const handleChangeSetShowNotification = (name, checked) => () => {
    dispatch({
      type: 'setShowNotification',
      payload: { [name]: !checked },
    });
  };
  return (
    <form className="h5">
      <GroupToggles description="Flashing:">
        <Toggle
          description={description.flashing}
          checked={flashing}
          handleChange={handleChangeSetToggle('flashing', flashing)}
        />
      </GroupToggles>

      <GroupToggles description="Show notifications:">
        {Object.entries(showNotifications).map(([name, checked]) => (
          <Toggle
            key={name}
            description={description[name]}
            checked={checked}
            handleChange={handleChangeSetShowNotification(name, checked)}
          />
        ))}
      </GroupToggles>

      <br />
      <SelectMenu
        name="popupTheme"
        text="Pop-up Menu Theme:"
        options={themes}
      />

    </form>
  );
};

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
