import {
  SET_ADMIN_USER_TEXT_FILTER,
  SET_ADMIN_POST_FILTER,
  SET_ADMIN_POST_SEARCHBY_FILTER,
} from '../actions/types';

const initialState = {
  adminUser: {
    text: '',
  },
  adminPost: {
    text: '',
    searchBy: 'postText',
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ADMIN_USER_TEXT_FILTER:
      return {
        ...state,
        adminUser: {
          text: payload,
        },
      };
    case SET_ADMIN_POST_FILTER:
      return {
        ...state,
        adminPost: {
          text: payload,
          searchBy: state.adminPost.searchBy,
        },
      };
    case SET_ADMIN_POST_SEARCHBY_FILTER:
      return {
        ...state,
        adminPost: {
          text: state.adminPost.text,
          searchBy: payload,
        },
      };
    default:
      return state;
  }
}
