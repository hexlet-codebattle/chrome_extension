import { setShowNotification, setTheme, setToggle } from '../actions';

export default (state, action) => {
  console.log('%c%s', 'color: #733d00', JSON.stringify(action));
  console.log('%c%s', 'color: #e50000', JSON.stringify(state));
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
