import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileRegisteredEvents = ({ profile: { profile } }) => {
  return (
    <div className='profile-container-special' style={{ height: '100%' }}>
      <div className='main-flex-one' style={{ flexGrow: 1 }}>
        <div className='profile-avatar'>
          <h2>
            Registered<span style={{ color: '#ff0a0a' }}> Events</span>
          </h2>
        </div>
        <div className='profile-bio' style={{ flexGrow: 1 }}>
          <div className='profile-bio__header'>
            <h3>
              <span className='red-span' style={{ color: '#ff0a0a' }}>
                Newbsanity{' '}
              </span>{' '}
              <span className='low-weight-span'>Events</span>
            </h3>
          </div>
          <p style={{ borderBottom: '3px solid #ff0a0a' }}>
            events you are currently registered for
          </p>
          {profile ? (
            profile.registeredEvents.length > 0 ? (
              <Fragment>
                {profile.registeredEvents.map((event) => (
                  <div
                    className='profile-events'
                    key={event.eventName}
                    style={{ flexGrow: 1 }}>
                    <div style={{ flexGrow: 1 }}>
                      <h3 className='event-title'>
                        {event.eventName}{' '}
                        <span className='low-weight-span'></span>
                      </h3>
                      <h5 style={{ paddingLeft: '2rem' }}>
                        Date:{' '}
                        <span className='low-weight-span'>
                          {event.eventDate.slice(0, 10)}
                        </span>
                      </h5>
                      <h5 style={{ paddingLeft: '2rem' }}>
                        Time:{' '}
                        <span className='low-weight-span'>
                          {event.eventTime}
                        </span>
                      </h5>
                    </div>
                  </div>
                ))}
              </Fragment>
            ) : (
              <div
                className='profile-events'
                style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 className='event-title'>
                  Not{' '}
                  <span className='low-weight-span'>
                    registered for any events...
                  </span>
                </h3>
                <div>
                  <button className='btn'>Events Page</button>
                </div>
              </div>
            )
          ) : (
            <div
              className='profile-events'
              style={{ display: 'flex', flexDirection: 'column' }}>
              <p className='event-text'>
                Create{' '}
                <span className='low-weight-span'>
                  a profile to register for events...
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileRegisteredEvents.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ProfileRegisteredEvents);
