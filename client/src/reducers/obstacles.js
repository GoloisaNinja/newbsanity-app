import { GET_OBSTACLES } from '../actions/types';

const initialState = {
  loading: true,
  obstacles: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_OBSTACLES:
      return {
        ...state,
        loading: false,
        obstacles: payload,
      };
    default:
      return state;
  }
}
