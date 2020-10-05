import React, { Fragment, useContext, useEffect } from 'react';

import JobsList from './JobsList';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Jobs = () => {
  const githubContext = useContext(GithubContext);

  const {
    loading,
    jobs,
    page,
    search,
    searchJobs,
    searchPage,
    currentCount,
    getJobs,
    setPage,
    setSearchPage,
    clearJobs,
    clearSearchJobs,
  } = githubContext;

  useEffect(() => {
    getJobs(page);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      clearJobs();
      clearSearchJobs();
    };
    // eslint-disable-next-line
  }, []);

  if (loading && jobs.length === 0 && searchJobs.length === 0) {
    return <Spinner />;
  }

  return (
    <div className='jobs-section section mt-3'>
      <div className='container'>
        {jobs.length !== 0 ? (
          <JobsList
            jobs={jobs}
            currentCount={currentCount}
            loadMore={(e) => {
              const nextPage = page + 1;
              setPage(nextPage);
              getJobs(nextPage);
            }}
          />
        ) : (
          <Fragment>
            {searchJobs.length !== 0 ? (
              <JobsList
                jobs={searchJobs}
                currentCount={currentCount}
                loadMore={(e) => {
                  const nextPage = searchPage + 1;
                  setSearchPage(nextPage);
                  getJobs(nextPage, search);
                }}
              />
            ) : (
              <p className='has-text-grey is-size-5 has-text-centered'>
                We couldn’t find any jobs...
              </p>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Jobs;
