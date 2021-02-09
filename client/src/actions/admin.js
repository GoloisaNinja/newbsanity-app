import axios from 'axios';
import {
  ADMIN_GET_USERS,
  ADMIN_GET_ALL_WORKOUTS,
  ADMIN_DELETE_USER_AVATAR,
} from './types';
import { setAlert } from './alert';

// Admin get all users

export const adminGetAllUsers = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: token,
    },
  };
  try {
    const res = await axios.get('/api/users/admin/getAll', config);
    dispatch({
      type: ADMIN_GET_USERS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e.message, e.stack);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};

// Admin get all workouts

export const adminGetAllWorkouts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/workouts/all');
    dispatch({
      type: ADMIN_GET_ALL_WORKOUTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e.message, e.stack);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};

// Admin Delete User Avatar

export const adminDeleteUserAvatar = (userId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.delete(
      `/api/users/admin/avatar/delete/${userId}`,
      config
    );
    dispatch({
      type: ADMIN_DELETE_USER_AVATAR,
      payload: userId,
    });
    dispatch(setAlert('Successfully deleted user avatar', 'success'));
  } catch (e) {
    console.log(e.message, e.stack);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};
