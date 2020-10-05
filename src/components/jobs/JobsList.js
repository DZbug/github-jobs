import React, { Fragment } from 'react';

import JobItem from './JobItem';

const JobsList = ({ jobs, currentCount, loadMore }) => {
  return (
    <Fragment>
      <div className='columns is-multiline'>
        {jobs.map((job, index) => (
          <JobItem key={index} job={job} />
        ))}
      </div>
      <div className='columns'>
        <div className='column is-2 is-offset-5'>
          {currentCount >= 50 && (
            <button
              onClick={loadMore}
              className='button is-primary is-fullwidth'
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default JobsList;
