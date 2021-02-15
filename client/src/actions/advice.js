import axios from 'axios';
import { GET_ADVICE } from './types';

// Get Advice

export const getAdvice = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/advice');
    dispatch({
      type: GET_ADVICE,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};
