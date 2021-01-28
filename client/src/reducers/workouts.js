import { CREATE_WORKOUT } from '../actions/types';

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
    default:
      return state;
  }
}
