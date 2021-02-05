import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../Alert';
import Spinner from '../Spinner';
import ProfileActions from './ProfileActions';
import Profile from './Profile';

const Dashboard = ({ auth: { user, loading } }) => {
  return (
    <div>
      {!loading ? (
        <Fragment>
          <Alert />
          <div className='content-container'>
            <Fragment>
              <h1 style={{ marginBottom: '1rem' }}>
                <span className='red-span'>Welcome</span>{' '}
                <span className='low-weight-span'>{user.name}!</span>
              </h1>
            </Fragment>
            <ProfileActions />
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Dashboard));
