import axios from 'axios';
import { GET_PROFILE, PROFILE_FAIL } from './types';
import { setAlert } from './alert';

export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_FAIL,
    });
  }
};
