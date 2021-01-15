import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../Alert';
import Spinner from '../Spinner';
import Profile from './Profile';

const Dashboard = ({ auth: { user, loading }, events }) => {
  return (
    <div>
      {!loading ? (
        <Fragment>
          <Alert />
          <div className='content-container'>
            <Profile user={user} />
          </div>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  events: state.events.events,
});

export default connect(mapStateToProps)(Dashboard);
