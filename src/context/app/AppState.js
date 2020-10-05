import React, { useReducer } from 'react';
import AppContext from './appContext';
import AppReducer from './appReducer';
import { TOGGLE_THEME } from '../types';

const AppState = (props) => {
  const initialState = {
    theme: localStorage.getItem('theme') ?? '',
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const toggleTheme = () => {
    dispatch({
      type: TOGGLE_THEME,
      payload: state.theme === '' ? 'dark-theme' : '',
    });
  };

  return (
    <AppContext.Provider
      value={{
        theme: state.theme,
        toggleTheme,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
