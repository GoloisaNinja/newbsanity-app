import axios from 'axios';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER,
  EDIT_AVATAR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_POSTS,
  CLEAR_PROFILE,
  CLEAR_USER_WORKOUTS,
} from './types';
import { setAlert } from './alert';
import SetAuthToken from '../utils/SetAuthToken';

// Load the User

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/users/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register new User

export const registerUser = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Such Wow! Welcome to Newbsanity!', 'success'));
  } catch (e) {
    if (
      e.response.data.message &&
      e.response.data.message.includes('duplicate')
    ) {
      e.response.data.message = 'Email already exists...';
    }
    dispatch(setAlert(e.response.data.message, 'danger'));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login the User

export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/user/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch(setAlert(e.response.data.message, 'danger'));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout the User/Clear Content

export const logoutUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: token,
    },
  };
  try {
    const res = await axios.post('/api/user/logout', config);
    if (res.status === 200) {
      dispatch({
        type: LOGOUT_USER,
      });
      dispatch({
        type: CLEAR_POSTS,
      });
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: CLEAR_USER_WORKOUTS,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// Upload user image for avatar

export const editAvatar = (formData, history) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: token,
    },
  };

  try {
    const res = await axios.post('/api/user/me/avatar', formData, config);
    if (res.status === 200) {
      dispatch(loadUser());
      dispatch(setAlert(res.data.message, 'success'));
      history.push('/dashboard');
    }
  } catch (e) {
    console.log(e);
    dispatch(setAlert(e.response.data.error, 'danger'));
  }
};
