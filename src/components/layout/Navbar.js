import React from 'react';

const Navbar = () => {
  return (
    <div
      className='section has-background-primary'
      style={{
        borderBottomLeftRadius: '5rem',
        paddingTop: '2rem',
        paddingBottom: '5rem',
      }}
    >
      <div className='container'>
        <div className='columns is-vcentered is-mobile'>
          <div className='column is-6'>
            <h1 className='title'>
              <a href='/' className='has-text-white'>
                devjobs
              </a>
            </h1>
          </div>
          <div className='column is-6 has-text-right'>
            <a href='#!' className='has-text-white'>
              <i className='fas fa-moon'></i> Dark Mode
              {/* <i className='fas fa-sun'></i> Light Mode */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
