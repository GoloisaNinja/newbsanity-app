import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Spinner from '../Spinner';
import ProfileEvents from './ProfileEvents';
import ProfileAdvice from './ProfileAdvice';
import ProfileRegisteredEvents from './ProfileRegisteredEvents';

const Profile = ({ user, getProfile, profile: { loading, profile } }) => {
  useEffect(() => {
    getProfile(user._id);
  }, [getProfile]);
  return !loading ? (
    <Fragment>
      <h1 style={{ marginBottom: '1rem' }}>
        <span className='red-span'>Welcome</span>{' '}
        <span className='low-weight-span'>{user.name}!</span>
      </h1>
      <div>
        <div className='bio-flex' style={{ height: '100%' }}>
          <div className='profile-container' style={{ flex: 1 }}>
            <div className='main-flex-one' style={{ flex: 1 }}>
              <div className='profile-avatar'>
                {user.avatar ? (
                  <img
                    className='post-avatar-profile'
                    src={`/api/user/${user._id}/avatar`}
                  />
                ) : (
                  <img
                    className='post-avatar-profile'
                    src='/img/defaultProfile.jpg'
                  />
                )}
              </div>
              {profile === null ? (
                <div className='profile-bio'>
                  <div className='profile-bio__header'>
                    <h3>
                      <span className='red-span' style={{ color: '#ff0a0a' }}>
                        Newbsanity{' '}
                      </span>{' '}
                      <span className='low-weight-span'>Profile</span>
                    </h3>
                  </div>
                  <p style={{ borderBottom: '3px solid #ff0a0a' }}>
                    Wow such empties...
                  </p>

                  <div className='profile-events'>
                    <h3 className='event-title'>
                      Looks{' '}
                      <span className='low-weight-span'>
                        like you don't have a profile...
                      </span>
                    </h3>

                    <p className='event-text'>You should make one!</p>
                  </div>
                </div>
              ) : (
                <div className='profile-bio' style={{ minWidth: '30rem' }}>
                  <div className='profile-bio__header'>
                    <h3>
                      <span className='red-span' style={{ color: '#ff0a0a' }}>
                        Newbsanity{' '}
                      </span>{' '}
                      <span className='low-weight-span'>Profile</span>
                    </h3>
                  </div>
                  <p style={{ borderBottom: '3px solid #ff0a0a' }}>Personal</p>
                  <ul
                    style={{
                      fontWeight: 300,
                      fontSize: '1.2rem',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                    }}>
                    <li>
                      <span className='personal-item-span'>bio: </span>
                      {profile.bio ? profile.bio : 'no bio yet'}
                    </li>
                    <li>
                      <span className='personal-item-span'>age: </span>
                      {profile.age}
                    </li>
                    <li>
                      <span className='personal-item-span'>gender: </span>
                      {profile.gender ? profile.gender : ''}
                    </li>
                    <li>
                      <span className='personal-item-span'>location: </span>
                      {profile.location ? profile.location : 'no location yet'}
                    </li>
                    <li>
                      <span className='personal-item-span'>career field: </span>
                      {profile.careerfield
                        ? profile.careerfield
                        : 'no career field yet'}
                    </li>
                    <li>
                      <span className='personal-item-span'>fitness lvl: </span>
                      {profile.currentfitnesslevel
                        ? profile.currentfitnesslevel
                        : 'no fitness level yet'}
                    </li>
                    <li>
                      <span className='personal-item-span'>
                        goal fitness lvl:{' '}
                      </span>
                      {profile.goalfitnesslevel
                        ? profile.goalfitnesslevel
                        : 'no goal fitness level yet'}
                    </li>
                  </ul>
                  <p style={{ borderBottom: '3px solid #ff0a0a' }}>Likes</p>
                  <div className='profile-hobbies'>
                    {profile.hobbies.length > 0 ? (
                      profile.hobbies.map((hobby) => (
                        <p className='profile-hobbies__item' key={hobby}>
                          {' '}
                          <i id='hobby-icon' className='fas fa-check-square' />
                          {hobby}
                        </p>
                      ))
                    ) : (
                      <p>
                        No{' '}
                        <span className='low-weight-span'>
                          likes at the moment...
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='double-flex'>
            <ProfileAdvice />
            <ProfileRegisteredEvents />
          </div>
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
