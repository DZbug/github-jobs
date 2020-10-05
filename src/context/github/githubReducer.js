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

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: [...state.jobs, ...payload],
        loading: false,
      };
    case CLEAR_JOBS:
      return {
        ...state,
        jobs: [],
        page: 1,
      };
    case SET_PAGE:
      return {
        ...state,
        page: payload,
      };
    case GET_JOB:
      return {
        ...state,
        job: payload,
        loading: false,
      };
    case CLEAR_JOB:
      return {
        ...state,
        job: {},
      };
    case SET_SEARCH:
      return {
        ...state,
        search: payload,
      };
    case SEARCH_JOBS:
      return {
        ...state,
        searchJobs: [...state.searchJobs, ...payload],
        loading: false,
      };
    case CLEAR_SEARCH_JOBS:
      return {
        ...state,
        search: {},
        searchJobs: [],
        searchPage: 1,
      };
    case SET_SEARCH_PAGE:
      return {
        ...state,
        searchPage: payload,
      };
    case SET_CURRENT_COUNT:
      return {
        ...state,
        currentCount: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
