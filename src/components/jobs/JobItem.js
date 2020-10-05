import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

const JobItem = ({
  job: { id, created_at, type, title, company, location },
}) => {
  return (
    <div className='column is-6-tablet is-4-desktop is-flex'>
      <div className='card' style={{ width: '100%' }}>
        <div className='card-content' style={{ height: '100%' }}>
          <div
            className='content is-flex'
            style={{
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <div className='mb-4' style={{ flex: '1' }}>
              <p className='has-text-grey'>
                <Moment fromNow ago>
                  {new Date(created_at)}
                </Moment>{' '}
                ago | {type}
              </p>
              <h3 className='has-text-weight-bold is-size-5-touch mt-0'>
                <Link to={`/job/${id}`} className='has-text-dark'>
                  {title}
                </Link>
              </h3>
              <p className='has-text-grey'>{company}</p>
            </div>
            <p className='has-text-primary has-text-weight-semibold'>
              {location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
