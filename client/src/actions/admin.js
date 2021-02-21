import axios from 'axios';
import {
  ADMIN_GET_USERS,
  ADMIN_GET_ALL_WORKOUTS,
  ADMIN_DELETE_USER_AVATAR,
  ADMIN_DELETE_USER,
  ADMIN_DELETE_POST,
  ADMIN_EDIT_ADMIN,
  ADMIN_GET_OBSTACLES,
  ADMIN_DELETE_OBSTACLE,
  ADMIN_GET_OBSTACLE_BY_ID,
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

// Admin Delete User

export const adminDeleteUser = (userId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.delete(
      `/api/users/admin/user/delete/${userId}`,
      config
    );
    dispatch({
      type: ADMIN_DELETE_USER,
      payload: userId,
    });
    dispatch(setAlert('Successfully deleted user account', 'success'));
  } catch (e) {
    console.log(e.message, e.stack);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};

// Admin Delete Post

export const adminDeletePost = (postId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.delete(`/api/posts/admin/delete/${postId}`, config);
    dispatch({
      type: ADMIN_DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert('Successfully deleted post', 'success'));
  } catch (e) {
    console.log(e.message, e.stack);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};

// Admin Edit Admin Access

export const adminEditAdmin = (userId, editParam) => async (dispatch) => {
  const token = localStorage.getItem('token');
  let isAdmin;
  if (editParam === 'add') {
    isAdmin = true;
  } else {
    isAdmin = false;
  }
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = JSON.stringify({ editParam });
    const res = await axios.patch(
      `/api/users/admin/user/isAdmin/${userId}`,
      body,
      config
    );
    if (res.status === 200) {
      dispatch({
        type: ADMIN_EDIT_ADMIN,
        payload: {
          id: userId,
          admin: isAdmin,
        },
      });
      dispatch(
        setAlert(
          editParam === 'add'
            ? 'Granted User Admin Access'
            : 'Removed User Admin Access',
          'success'
        )
      );
    }
  } catch (e) {
    console.log(e.message, e.stack);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};

// Admin Get All Obstacles (admin)

export const adminGetObstacles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/obstacles/');
    dispatch({
      type: ADMIN_GET_OBSTACLES,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// Admin Delete Obstacle (admin)

export const adminDeleteObstacle = (obstacleId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.delete(
      `/api/obstacles/admin/delete/${obstacleId}`,
      config
    );
    dispatch({
      type: ADMIN_DELETE_OBSTACLE,
      payload: obstacleId,
    });
    dispatch(setAlert('Successfully deleted obstacle', 'success'));
  } catch (e) {
    console.log(e.message, e.stack);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};

// Admin Get Obstacle by Id (admin)

export const adminGetObstacleById = (obstacleId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.get(
      `/api/obstacles/admin/obstacle/${obstacleId}`,
      config
    );
    dispatch({
      type: ADMIN_GET_OBSTACLE_BY_ID,
      payload: res.data,
    });
  } catch (e) {
    console.log(e.message, e.stack);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};

// Admin Edit Obstacle (admin)

export const adminEditObstacle = (formData, obstacleId, history) => async (
  dispatch
) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = formData;
    const res = await axios.post(
      `/api/obstacles/admin/edit/${obstacleId}`,
      body,
      config
    );
    if (res.status === 200) {
      dispatch(setAlert('Successfully edited obstacle data', 'success'));
      history.push('/admin/obstacles');
    }
  } catch (e) {
    console.log(e.message, e.stack);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};
