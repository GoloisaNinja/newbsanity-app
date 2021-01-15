import { GET_PROFILE, CLEAR_PROFILE, PROFILE_FAIL } from '../actions/types';

const initialState = {
  loading: true,
  profile: null,
  profiles: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
    case PROFILE_FAIL:
      return {
        ...state,
        profile: null,
        profiles: [],
        loading: false,
      };
    default:
      return state;
  }
}
