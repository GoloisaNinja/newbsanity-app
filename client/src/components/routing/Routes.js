import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from '../About';
import Obstacles from '../obstacles/Obstacles';
import Pricing from '../Pricing';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../profile/Dashboard';
import EventsPage from '../events/EventsPage';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Event from '../events/Event';
import CreateProfileForm from '../profile/profile-forms/CreateProfileForm';
import CreateWorkoutForm from '../workouts/CreateWorkoutForm';
import Avatar from '../profile/profile-forms/Avatar';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import AdminPanel from '../admin/AdminPanel';
import UserPanel from '../admin/users/UserPanel';
import PostPanel from '../admin/posts/PostPanel';
import ObstaclePanel from '../admin/obstacles/ObstaclePanel';
import EditObstacle from '../admin/obstacles/EditObstacle';
import AddObstacle from '../admin/obstacles/AddObstacle';
import EventPanel from '../admin/events/EventPanel';
import EditEvent from '../admin/events/EditEvent';
import AddEvent from '../admin/events/AddEvent';

const Routes = () => {
  return (
    <Switch>
      <Route path='/pricing' component={Pricing} />
      <Route path='/about' component={About} />
      <Route path='/obstacles' component={Obstacles} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/posts' component={Posts} />
      <PrivateRoute path='/post/:id' component={Post} />
      <PrivateRoute path='/profile' component={CreateProfileForm} />
      <PrivateRoute path='/avatar' component={Avatar} />
      <PrivateRoute path='/events' component={EventsPage} />
      <PrivateRoute path='/event/:id' component={Event} />
      <PrivateRoute path='/workouts' component={CreateWorkoutForm} />
      <AdminRoute exact path='/admin' component={AdminPanel} />
      <AdminRoute path='/admin/users' component={UserPanel} />
      <AdminRoute path='/admin/posts' component={PostPanel} />
      <AdminRoute exact path='/admin/obstacles' component={ObstaclePanel} />
      <AdminRoute path='/admin/obstacle/:id' component={EditObstacle} />
      <AdminRoute path='/admin/obstacles/add' component={AddObstacle} />
      <AdminRoute exact path='/admin/events' component={EventPanel} />
      <AdminRoute path='/admin/event/:id' component={EditEvent} />
      <AdminRoute path='/admin/events/add' component={AddEvent} />
    </Switch>
  );
};

export default Routes;
