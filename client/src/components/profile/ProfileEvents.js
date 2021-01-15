import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLandingEvents } from '../../actions/events';

const ProfileEvents = ({ events, getLandingEvents }) => {
  useEffect(() => {
    getLandingEvents();
  }, [getLandingEvents]);
  return (
    <div className='profile-container'>
      <div className='main-flex-one'>
        <div className='profile-avatar'>
          <h2>
            #Seeing<span style={{ color: '#ff0a0a' }}>Red</span>
          </h2>
        </div>
        <div className='profile-bio'>
          <div className='profile-bio__header'>
            <h3>
              <span className='red-span' style={{ color: '#ff0a0a' }}>
                Newbsanity{' '}
              </span>{' '}
              <span className='low-weight-span'>Events</span>
            </h3>
          </div>
          <p style={{ borderBottom: '3px solid #ff0a0a' }}>Upcoming Events</p>
          <Fragment>
            {events.map((event) => (
              <div
                className='profile-events'
                key={event.title}
                style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                  <h3 className='event-title'>
                    {event.title} <span className='low-weight-span'></span>
                  </h3>
                  <h5 style={{ paddingLeft: '2rem' }}>
                    Date:{' '}
                    <span className='low-weight-span'>
                      {event.date.slice(0, 10)}
                    </span>
                  </h5>
                  <h5 style={{ paddingLeft: '2rem' }}>
                    Time: <span className='low-weight-span'>{event.time}</span>
                  </h5>
                  <p className='event-text'>{event.text}</p>
                </div>
              </div>
            ))}
          </Fragment>
        </div>
      </div>
    </div>
  );
};

ProfileEvents.propTypes = {
  events: PropTypes.array.isRequired,
  getLandingEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events.events,
});

export default connect(mapStateToProps, { getLandingEvents })(ProfileEvents);
