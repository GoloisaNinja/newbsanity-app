import { CREATE_WORKOUT, GET_USER_WORKOUTS } from '../actions/types';

const initialState = {
  loading: true,
  workouts: [],
  workout: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_WORKOUT:
      return {
        ...state,
        workout: payload,
        loading: false,
      };
    case GET_USER_WORKOUTS:
      return {
        ...state,
        loading: false,
        workouts: payload,
      };
    default:
      return state;
  }
}
