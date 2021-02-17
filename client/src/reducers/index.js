import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import events from './events';
import posts from './posts';
import profile from './profile';
import workouts from './workouts';
import trophy from './trophy';
import admin from './admin';
import obstacles from './obstacles';
import advice from './advice';
import filters from './filters';
export default combineReducers({
  admin,
  alert,
  auth,
  events,
  posts,
  profile,
  workouts,
  trophy,
  obstacles,
  advice,
  filters,
});
