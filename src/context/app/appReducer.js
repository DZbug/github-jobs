import { TOGGLE_THEME } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_THEME:
      localStorage.setItem('theme', payload);
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
};
