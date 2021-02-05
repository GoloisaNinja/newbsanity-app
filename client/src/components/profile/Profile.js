import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Spinner from '../Spinner';
import ProfileTop from './ProfileTop';
import ProfileEvents from './ProfileEvents';
import ProfileAdvice from './ProfileAdvice';
import ProfileRegisteredEvents from './ProfileRegisteredEvents';
import ProfileWorkouts from './ProfileWorkouts';
import Modal from '../Modal';
import { assignTrophy, seenTrophy } from '../../actions/trophies';

const Profile = ({
  user,
  getProfile,
  profile: { loading, profile },
  seenTrophy,
  assignTrophy,
  trophy: { trophy },
}) => {
  useEffect(() => {
    getProfile(user._id);
  }, [getProfile]);

  const [show, setShow] = useState(false);
  const [content, setContent] = useState();

  const handleDismiss = () => {
    seenTrophy(trophy._id);
    setShow(false);
  };

  useEffect(() => {
    if (user.loginCount === 10) {
      assignTrophy('601d2694d9db960017439143');
    }
  }, []);

  useEffect(() => {
    if (trophy !== null) {
      console.log('running based on trophy');
      setContent({
        title: trophy.title,
        body: trophy.body,
        icon: trophy.icon,
        type: 'dismiss',
      });
      setShow(true);
    }
  }, [trophy]);

  return !loading ? (
    <Fragment>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='profile-main-grid'>
          <ProfileTop />
          <ProfileAdvice />
          <ProfileRegisteredEvents />
        </div>
        <ProfileEvents />
        <ProfileWorkouts />
      </div>
      <Modal show={show} handleDismiss={handleDismiss} content={content} />
    </Fragment>
  ) : (
    <Spinner />
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  seenTrophy: PropTypes.func.isRequired,
  assignTrophy: PropTypes.func.isRequired,
  trophy: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  trophy: state.trophy,
});

export default connect(mapStateToProps, {
  getProfile,
  assignTrophy,
  seenTrophy,
})(Profile);
