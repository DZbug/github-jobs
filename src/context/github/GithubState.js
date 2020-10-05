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

const api = 'http://localhost:5000/api';

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
      clearSearchJobs();

      const res = await axios.get(`${api}/github-jobs?page=${page}`);

      // если больше не возвращается, заблочить кнопку и не выполнять запросы (оповещение)

      setCurrentCount(res.data.length);

      dispatch({
        type: GET_JOBS,
        payload: res.data,
      });
    }
  };

  const clearJobs = () => dispatch({ type: CLEAR_JOBS });

  const setPage = (page) => dispatch({ type: SET_PAGE, payload: page });

  const getJob = async (id) => {
    setLoading();

    const res = await axios.get(`${api}/github-jobs/${id}`);

    dispatch({
      type: GET_JOB,
      payload: res.data,
    });
  };

  const clearJob = () => dispatch({ type: CLEAR_JOB });

  const setSearch = (data) => dispatch({ type: SET_SEARCH, payload: data });

  const searchJobs = async (page, data) => {
    clearJobs();

    setLoading();

    const { description, location } = data;

    setSearch(data);

    const res = await axios.get(
      `${api}/github-jobs?page=${page}&description=${description}&location=${location}`
    );

    setCurrentCount(res.data.length);

    dispatch({
      type: SEARCH_JOBS,
      payload: res.data,
    });
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
