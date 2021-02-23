import {
  GET_LANDING_EVENTS,
  GET_ALL_EVENTS,
  GET_EVENT,
  UPDATE_EVENT_REGISTRATION,
  UPDATE_EVENT_LIKES,
  CREATE_EVENT_COMMENT,
  DELETE_EVENT_COMMENT,
  ADMIN_DELETE_EVENT,
} from '../actions/types';

const initialState = {
  loading: true,
  events: [],
  allevents: [],
  event: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LANDING_EVENTS:
      return {
        ...state,
        loading: false,
        events: payload,
      };
    case GET_ALL_EVENTS:
      return {
        ...state,
        loading: false,
        allevents: payload,
      };
    case GET_EVENT:
      return {
        ...state,
        loading: false,
        event: payload,
      };
    case CREATE_EVENT_COMMENT:
      return {
        ...state,
        event: { ...state.event, comments: payload },
        loading: false,
      };
    case DELETE_EVENT_COMMENT:
      return {
        ...state,
        event: {
          ...state.event,
          comments: state.event.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    case UPDATE_EVENT_REGISTRATION:
      return {
        ...state,
        loading: false,
        allevents: state.allevents.map((event) =>
          event._id === payload.id
            ? { ...event, registration: payload.registration }
            : event
        ),
      };
    case UPDATE_EVENT_LIKES:
      return {
        ...state,
        loading: false,
        allevents: state.allevents.map((event) =>
          event._id === payload.id ? { ...event, likes: payload.likes } : event
        ),
      };
    case ADMIN_DELETE_EVENT:
      return {
        ...state,
        loading: false,
        allevents: state.allevents.filter((event) => event._id !== payload),
      };
    default:
      return state;
  }
}
