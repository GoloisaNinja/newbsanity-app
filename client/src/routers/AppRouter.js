import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import Routes from '../components/routing/Routes';
import ScrollToTop from '../components/ScollToTop';

// Redux
import { Provider } from 'react-redux';
import store from '../store';
import SetAuthToken from '../utils/SetAuthToken';
import { loadUser } from '../actions/auth';

if (localStorage.token) {
  SetAuthToken(localStorage.token);
}

const AppRouter = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Fragment>
          <Header />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default AppRouter;
