import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import events from './events';
import posts from './posts';
export default combineReducers({ alert, auth, events, posts });
