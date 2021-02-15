import axios from 'axios';
import { GET_OBSTACLES } from './types';

// Get All Obstacles

export const getObstacles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/obstacles/');
    dispatch({
      type: GET_OBSTACLES,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};
