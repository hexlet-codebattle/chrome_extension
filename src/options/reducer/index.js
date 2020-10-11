import { setShowNotification, setTheme, setToggle } from '../actions';

export default (state, action) => {
  switch (action.type) {
    case setToggle:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          ...action.payload,
        },
      };
    case setShowNotification:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          showNotifications: {
            ...state.toggles.showNotifications,
            ...action.payload,
          },
        },
      };
    case setTheme:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
