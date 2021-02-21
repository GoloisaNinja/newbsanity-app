import {
  ADMIN_GET_USERS,
  ADMIN_GET_ALL_WORKOUTS,
  ADMIN_DELETE_USER_AVATAR,
  ADMIN_DELETE_USER,
  ADMIN_EDIT_ADMIN,
  ADMIN_GET_OBSTACLES,
  ADMIN_DELETE_OBSTACLE,
  ADMIN_GET_OBSTACLE_BY_ID,
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
  obstacles: {
    obstacles: [],
    obstacle: null,
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
    case ADMIN_EDIT_ADMIN:
      return {
        ...state,
        users: {
          loading: false,
          users: state.users.users.map((user) =>
            user._id === payload.id ? { ...user, isAdmin: payload.admin } : user
          ),
        },
      };
    case ADMIN_DELETE_USER:
      return {
        ...state,
        users: {
          loading: false,
          users: state.users.users.filter((user) => user._id !== payload),
        },
      };
    case ADMIN_GET_OBSTACLES:
      return {
        ...state,
        obstacles: {
          loading: false,
          obstacles: payload,
          obstacle: null,
          error: {},
        },
      };
    case ADMIN_DELETE_OBSTACLE:
      return {
        ...state,
        obstacles: {
          loading: false,
          obstacles: state.admin.obstacles.obstacles.filter(
            (obstacle) => obstacle._id !== payload
          ),
          obstacle: null,
          error: {},
        },
      };
    case ADMIN_GET_OBSTACLE_BY_ID:
      return {
        ...state,
        obstacles: {
          obstacles: [],
          loading: false,
          obstacle: payload,
          error: {},
        },
      };
    default:
      return state;
  }
}
