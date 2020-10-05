import React, { Fragment, useContext, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import dompurify from 'dompurify';

import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Job = ({ match }) => {
  const sanitizer = dompurify.sanitize;

  const githubContext = useContext(GithubContext);

  const { loading, job, getJob, clearJob } = githubContext;

  useEffect(() => {
    getJob(match.params.id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      clearJob();
    };
    // eslint-disable-next-line
  }, []);

  const {
    created_at,
    type,
    title,
    location,
    description,
    how_to_apply,
    company,
    company_url,
    company_logo,
    url,
  } = job;

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className='section py-0' style={{ position: 'relative' }}>
        <div className='container'>
          <div
            className='card'
            style={{
              position: 'absolute',
              width: '100%',
              top: '-2.25rem',
            }}
          >
            <div className='card-content job-card-content'>
              <div className='content'>
                <div
                  className='is-flex-tablet has-text-centered-mobile'
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div className='mb-4'>
                    <div
                      className='is-flex-tablet'
                      style={{ alignItems: 'center' }}
                    >
                      <img
                        className='is-hidden-mobile'
                        src={company_logo}
                        alt=''
                        style={{
                          height: 'auto',
                          maxHeight: '60px',
                          maxWidth: '100px',
                          marginRight: '1rem',
                        }}
                      />
                      <div>
                        <h1 className='has-text-weight-bold is-size-4-mobile mt-0 mb-2'>
                          {company}
                        </h1>
                        {company_url && (
                          <p>{company_url.replace(/(^\w+:|^)\/\//, '')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {company_url && (
                    <a
                      href={company_url}
                      className='button is-link is-light'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Company Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='section' style={{ paddingTop: '10.5rem' }}>
        <div className='container'>
          <div className='columns'>
            <div className='column'>
              <div className='card'>
                <div className='card-content job-card-content'>
                  <div className='content'>
                    <p className='has-text-grey mb-2'>
                      <Moment fromNow ago>
                        {new Date(created_at)}
                      </Moment>{' '}
                      ago | {type}
                    </p>
                    <div
                      className='is-flex-tablet'
                      style={{
                        justifyContent: 'space-between',
                      }}
                    >
                      <div className='mb-5'>
                        <h1 className='has-text-weight-bold is-size-4-mobile mt-0 mb-2'>
                          {title}
                        </h1>
                        <p className='has-text-primary has-text-weight-semibold '>
                          {location}
                        </p>
                      </div>
                      <div className='columns'>
                        <div className='column'>
                          <a
                            href={url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='button is-link is-primary is-fullwidth'
                          >
                            Apply Now
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className='pt-5'
                      dangerouslySetInnerHTML={{
                        __html: sanitizer(description),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='card mt-5 has-text-white has-background-primary'>
                <div className='card-content job-card-content'>
                  <div className='content how-to-apply'>
                    <h2 className='has-text-weight-bold mt-0 is-size-4-mobile has-text-white'>
                      How to Apply
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitizer(how_to_apply),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Job;
