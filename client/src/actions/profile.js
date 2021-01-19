import axios from 'axios';
import { GET_PROFILE, PROFILE_FAIL, CREATE_PROFILE } from './types';
import { setAlert } from './alert';

export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: e.response.data.msg, status: e.response.status },
    });
  }
};
export const createProfile = (formData, history, edit = false) => async (
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
    const res = await axios.post('/api/profiles', body, config);
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
    dispatch(
      setAlert(edit ? 'Changed your deets' : 'Created your profile', 'success')
    );
    history.push('/dashboard');
  } catch (e) {
    console.log(e);
    dispatch(setAlert(e.response.data, 'danger'));
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: e.response.data.message, status: e.response.status },
    });
  }
};
