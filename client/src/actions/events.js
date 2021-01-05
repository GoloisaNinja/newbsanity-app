import axios from 'axios';
import { GET_LANDING_EVENTS } from './types';

// Get 4 Events from DB to display to landing page

export const getLandingEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/events/landing');
    dispatch({
      type: GET_LANDING_EVENTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};
