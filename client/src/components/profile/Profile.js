import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Spinner from '../Spinner';
import ProfileTop from './ProfileTop';
import ProfileEvents from './ProfileEvents';
import ProfileAdvice from './ProfileAdvice';
import ProfileRegisteredEvents from './ProfileRegisteredEvents';

const Profile = ({ user, getProfile, profile: { loading, profile } }) => {
  useEffect(() => {
    getProfile(user._id);
  }, [getProfile]);
  return !loading ? (
    <Fragment>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='profile-main-grid'>
          <ProfileTop />
          <ProfileAdvice />
          <ProfileRegisteredEvents />
        </div>
        <ProfileEvents />
      </div>
    </Fragment>
  ) : (
    <Spinner />
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Profile);
