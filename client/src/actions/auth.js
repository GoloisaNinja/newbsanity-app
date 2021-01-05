import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './types';
import { setAlert } from './alert';

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
      type: REGISTER_USER,
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
      type: LOGIN_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};
