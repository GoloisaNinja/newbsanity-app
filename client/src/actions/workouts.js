import axios from 'axios';
import { CREATE_WORKOUT, GET_USER_WORKOUTS, DELETE_WORKOUT } from './types';
import { setAlert } from './alert';

// Create a new Workout

export const createWorkout = (formData) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = formData;
    const res = await axios.post('/api/workouts', body, config);
    dispatch({
      type: CREATE_WORKOUT,
      payload: res.data,
    });
    dispatch(setAlert('Workout Created!', 'success'));
  } catch (e) {
    console.log(e);
  }
};

// Delete a Workout

export const deleteWorkout = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.delete(`/api/workouts/delete/${id}`, config);
    if (res.status === 200) {
      dispatch({
        type: DELETE_WORKOUT,
        payload: id,
      });
      dispatch(setAlert('Workout dirty deleted...', 'success'));
    }
  } catch (e) {
    console.log(e);
  }
};

// Get all workouts by User Id

export const getUserWorkouts = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.get('/api/workouts/user', config);
    dispatch({
      type: GET_USER_WORKOUTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};
