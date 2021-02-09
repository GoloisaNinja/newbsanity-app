import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import events from './events';
import posts from './posts';
import profile from './profile';
import workouts from './workouts';
import trophy from './trophy';
import admin from './admin';
export default combineReducers({
  admin,
  alert,
  auth,
  events,
  posts,
  profile,
  workouts,
  trophy,
});
