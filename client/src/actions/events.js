import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_LANDING_EVENTS,
  GET_ALL_EVENTS,
  GET_EVENT,
  UPDATE_EVENT_REGISTRATION,
  UPDATE_EVENT_LIKES,
  CREATE_EVENT_COMMENT,
  DELETE_EVENT_COMMENT,
} from './types';

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

// Get all Events in the Database for the full Events Page

export const getAllEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/events/all');
    dispatch({
      type: GET_ALL_EVENTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// Get single event by ID

export const getEvent = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };

    const res = await axios.get(`/api/events/event/${id}`, config);
    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// Register User for Event

export const registerForEvent = (id, comment) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = { text: comment };
    const res = await axios.post(`/api/event/register/${id}`, body, config);
    dispatch({
      type: UPDATE_EVENT_REGISTRATION,
      payload: {
        id,
        registration: res.data,
      },
    });
    dispatch(setAlert('Registered for event!', 'success'));
  } catch (e) {
    console.log(e);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};

// UnRegister User for Event

export const unRegisterForEvent = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.post(`/api/event/unregister/${id}`, config);
    dispatch({
      type: UPDATE_EVENT_REGISTRATION,
      payload: {
        id,
        registration: res.data,
      },
    });
    dispatch(setAlert('Unregistered Quitter McQuitterson...', 'success'));
  } catch (e) {
    console.log(e);
    dispatch(setAlert(e.response.data.message, 'danger'));
  }
};

// Like an Event

export const likeEvent = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };

    const res = await axios.post(`/api/events/like/${id}`, config);
    dispatch({
      type: UPDATE_EVENT_LIKES,
      payload: {
        id,
        likes: res.data,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// Unlike an Event

export const unlikeEvent = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };

    const res = await axios.post(`/api/events/unlike/${id}`, config);
    dispatch({
      type: UPDATE_EVENT_LIKES,
      payload: {
        id,
        likes: res.data,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// Create an event comment

export const createEventComment = (id, text) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = text;
    const res = await axios.post(`/api/events/comment/${id}`, body, config);
    dispatch({
      type: CREATE_EVENT_COMMENT,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// Delete event comment

export const deleteEventComment = (eventId, commentId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.delete(
      `/api/events/deletecomment/${eventId}/${commentId}`,
      config
    );
    if (res.status === 200) {
      dispatch({
        type: DELETE_EVENT_COMMENT,
        payload: commentId,
      });
      dispatch(setAlert('Comment dirty deleted...', 'success'));
    }
  } catch (e) {
    console.log(e);
  }
};
