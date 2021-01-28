import axios from 'axios';
import { CREATE_WORKOUT } from './types';
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
