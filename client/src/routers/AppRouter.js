import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import About from '../components/About';
import Obstacles from '../components/Obstacles';
import Pricing from '../components/Pricing';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Dashboard from '../components/Dashboard';

// Redux
import { Provider } from 'react-redux';
import store from '../store';

const AppRouter = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/pricing' component={Pricing} />
          <Route path='/about' component={About} />
          <Route path='/obstacles' component={Obstacles} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  </Provider>
);

export default AppRouter;
