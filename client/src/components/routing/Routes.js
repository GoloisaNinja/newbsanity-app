import React, { Fragment } from 'react';
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
import Avatar from '../profile/profile-forms/Avatar';
import PrivateRoute from './PrivateRoute';

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
    </Switch>
  );
};

export default Routes;
