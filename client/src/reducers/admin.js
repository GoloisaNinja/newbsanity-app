import {
  ADMIN_GET_USERS,
  ADMIN_GET_ALL_WORKOUTS,
  ADMIN_DELETE_USER_AVATAR,
} from '../actions/types';

const initialState = {
  users: [],
  registrations: [],
  workouts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_GET_USERS:
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case ADMIN_GET_ALL_WORKOUTS:
      return {
        ...state,
        loading: false,
        workouts: payload,
      };
    case ADMIN_DELETE_USER_AVATAR:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user._id === payload ? { ...user, avatar: undefined } : user
        ),
      };
    default:
      return state;
  }
}
