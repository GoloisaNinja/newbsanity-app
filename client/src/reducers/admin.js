import {
  ADMIN_GET_USERS,
  ADMIN_GET_ALL_WORKOUTS,
  ADMIN_DELETE_USER_AVATAR,
} from '../actions/types';

const initialState = {
  users: {
    users: [],
    loading: true,
    error: {},
  },
  registrations: {
    registrations: [],
    loading: true,
    error: {},
  },
  workouts: {
    workouts: [],
    loading: true,
    error: {},
  },
  posts: {
    post: [],
    loading: true,
    error: {},
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_GET_USERS:
      return {
        ...state,
        users: {
          users: payload,
          loading: false,
        },
      };
    case ADMIN_GET_ALL_WORKOUTS:
      return {
        ...state,
        workouts: {
          workouts: payload,
          loading: false,
        },
      };
    case ADMIN_DELETE_USER_AVATAR:
      return {
        ...state,
        users: {
          loading: false,
          users: state.users.users.map((user) =>
            user._id === payload ? { ...user, avatar: undefined } : user
          ),
        },
      };
    default:
      return state;
  }
}
