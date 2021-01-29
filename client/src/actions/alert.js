import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

// Set an Alert

export const setAlert = (message, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  window.scrollTo(0, 0);
  dispatch({
    type: SET_ALERT,
    payload: { message, alertType, id },
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, timeout);
};
