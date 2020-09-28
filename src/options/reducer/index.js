import { setTheme, setToggle } from '../actions';

export default (state, action) => {
  switch (action.type) {
    case setToggle:
      return {
        ...state,
        toggles: {
          ...state.toogles,
          ...action.payload,
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
