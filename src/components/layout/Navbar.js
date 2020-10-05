import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../../context/app/appContext';

const Navbar = () => {
  const appContext = useContext(AppContext);

  const { theme, toggleTheme } = appContext;

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleClick = (e) => {
    toggleTheme();
  };

  return (
    <header className='main-header section has-background-primary'>
      <div className='container'>
        <div className='columns is-vcentered is-mobile'>
          <div className='column is-6'>
            <h1 className='title'>
              <Link to='/' className='has-text-white'>
                devjobs
              </Link>
            </h1>
          </div>
          <div className='column is-6 has-text-right'>
            <a href='#!' onClick={handleClick} className='has-text-white'>
              <i className={theme === '' ? 'fas fa-moon' : 'fas fa-sun'}></i>{' '}
              {theme === '' ? 'Dark Mode' : 'Light Mode'}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
