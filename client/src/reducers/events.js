import { GET_LANDING_EVENTS } from '../actions/types';

const initialState = {
  loading: true,
  events: [],
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
    default:
      return state;
  }
}
