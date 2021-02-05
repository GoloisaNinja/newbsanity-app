import { ASSIGN_TROPHY, TROPHY_SEEN } from '../actions/types';

const initialState = {
  loading: true,
  trophy: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ASSIGN_TROPHY:
      return {
        ...state,
        trophy: payload,
        loading: false,
      };
    case TROPHY_SEEN:
      return {
        ...state,
        loading: false,
        trophy: null,
      };
    default:
      return state;
  }
}
