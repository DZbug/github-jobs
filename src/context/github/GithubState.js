import React, { useReducer } from 'react';
import axios from 'axios';

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  GET_JOBS,
  CLEAR_JOBS,
  SET_PAGE,
  GET_JOB,
  CLEAR_JOB,
  SET_SEARCH,
  SEARCH_JOBS,
  CLEAR_SEARCH_JOBS,
  SET_SEARCH_PAGE,
  SET_CURRENT_COUNT,
  SET_LOADING,
} from '../types';

const cors = 'https://cors-anywhere.herokuapp.com/';

const GithubState = (props) => {
  const initialState = {
    jobs: [],
    page: 1,
    job: {},
    search: {},
    searchJobs: [],
    searchPage: 1,
    currentCount: 0,
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const getJobs = async (page, data = {}) => {
    const { description, location } = data;

    setLoading();

    if ((description && description !== '') || (location && location !== '')) {
      searchJobs(page, data);
    } else {
      setTimeout(async () => {
        // временно, для оптимизации
        if (!localStorage.getItem('jobs')) {
          clearSearchJobs();

          const res = await axios.get(
            `${cors}https://jobs.github.com/positions.json?page=${page}`
          );

          // если больше не возвращается, заблочить кнопку и не выполнять запросы (оповещение)

          localStorage.setItem('jobs', JSON.stringify(res.data));

          setCurrentCount(res.data.length);

          dispatch({
            type: GET_JOBS,
            payload: res.data,
          });
        } else {
          clearSearchJobs();

          setCurrentCount(50);

          dispatch({
            type: GET_JOBS,
            payload: JSON.parse(localStorage.getItem('jobs')),
          });
        }
      }, 2000);
    }
  };

  const clearJobs = () => dispatch({ type: CLEAR_JOBS });

  const setPage = (page) => dispatch({ type: SET_PAGE, payload: page });

  const getJob = async (id) => {
    setLoading();

    setTimeout(async () => {
      // временно, для оптимизации
      if (!localStorage.getItem('job')) {
        const res = await axios.get(
          `${cors}https://jobs.github.com/positions/${id}.json`
        );

        localStorage.setItem('job', JSON.stringify(res.data));

        dispatch({
          type: GET_JOB,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_JOB,
          payload: JSON.parse(localStorage.getItem('job')),
        });
      }
    }, 2000);
  };

  const clearJob = () => dispatch({ type: CLEAR_JOB });

  const setSearch = (data) => dispatch({ type: SET_SEARCH, payload: data });

  const searchJobs = async (page, data) => {
    clearJobs();

    setLoading();

    setTimeout(async () => {
      // временно, для оптимизации
      if (!localStorage.getItem('jobs')) {
        const { description, location } = data;

        setSearch(data);

        const res = await axios.get(
          `${cors}https://jobs.github.com/positions.json?page=${page}&description=${description}&location=${location}`
        );

        setCurrentCount(res.data.length);

        dispatch({
          type: SEARCH_JOBS,
          payload: res.data,
        });
      } else {
        setSearch(data);

        setCurrentCount(50);

        dispatch({
          type: SEARCH_JOBS,
          payload: JSON.parse(localStorage.getItem('jobs')),
        });
      }
    }, 2000);
  };

  const clearSearchJobs = () => dispatch({ type: CLEAR_SEARCH_JOBS });

  const setSearchPage = (page) =>
    dispatch({ type: SET_SEARCH_PAGE, payload: page });

  const setCurrentCount = (count) =>
    dispatch({ type: SET_CURRENT_COUNT, payload: count });

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        jobs: state.jobs,
        page: state.page,
        job: state.job,
        search: state.search,
        searchJobs: state.searchJobs,
        searchPage: state.searchPage,
        currentCount: state.currentCount,
        loading: state.loading,
        getJobs,
        setPage,
        getJob,
        clearJob,
        clearSearchJobs,
        setSearchPage,
        clearJobs,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
