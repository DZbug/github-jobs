import React, { useState, useContext } from 'react';

import GithubContext from '../../context/github/githubContext';

const Search = () => {
  const githubContext = useContext(GithubContext);

  const { searchPage, page, getJobs, clearSearchJobs } = githubContext;

  const [formData, setFormData] = useState({
    description: '',
    location: '',
  });

  const { description, location } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    clearSearchJobs();

    getJobs(searchPage, { description, location });
  };

  return (
    <div className='search-section section py-0'>
      <div className='container'>
        <div className='card'>
          <div className='card-content p-4'>
            <form onSubmit={handleSubmit} className='is-flex'>
              <div className='search-section-control control mr-2'>
                <p className='control is-expanded has-icons-left'>
                  <input
                    className='input'
                    type='text'
                    placeholder='Filter by title, companies...'
                    value={description}
                    name='description'
                    onChange={handleChange}
                  />
                  <span className='icon is-small is-left has-text-primary'>
                    <i className='fas fa-search is-size-5'></i>
                  </span>
                </p>
              </div>
              <div className='search-section-control control mr-2'>
                <p className='control is-expanded has-icons-left'>
                  <input
                    className='input'
                    type='text'
                    placeholder='Filter by location...'
                    value={location}
                    name='location'
                    onChange={handleChange}
                  />
                  <span className='icon is-small is-left has-text-primary'>
                    <i className='fas fa-map-marker-alt is-size-5'></i>
                  </span>
                </p>
              </div>
              <div className='control mr-2'>
                <button type='submit' className='button is-link'>
                  <span className='icon'>
                    <i className='fas fa-search'></i>
                  </span>
                </button>
              </div>
              <div className='control'>
                <button
                  type='button'
                  className='button is-link is-light'
                  onClick={(e) => {
                    setFormData({
                      description: '',
                      location: '',
                    });

                    clearSearchJobs();

                    getJobs(page);
                  }}
                >
                  <span className='icon'>
                    <i className='fas fa-undo-alt'></i>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
