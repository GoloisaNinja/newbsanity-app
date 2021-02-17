import {
  SET_ADMIN_USER_TEXT_FILTER,
  SET_ADMIN_POST_FILTER,
  SET_ADMIN_POST_SEARCHBY_FILTER,
} from './types';

export const setAdminUserTextFilter = (text = '') => (dispatch) => {
  dispatch({
    type: SET_ADMIN_USER_TEXT_FILTER,
    payload: text,
  });
};

export const setAdminPostFilter = (text = '') => (dispatch) => {
  dispatch({
    type: SET_ADMIN_POST_FILTER,
    payload: text,
  });
};

export const setAdminPostSearchBy = (searchBy = 'postText') => (dispatch) => {
  dispatch({
    type: SET_ADMIN_POST_SEARCHBY_FILTER,
    payload: searchBy,
  });
};
