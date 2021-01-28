import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllEvents } from '../../actions/events';
import { getProfile } from '../../actions/profile';
import FullEvent from './FullEvent';
import Spinner from '../Spinner';
import Alert from '../Alert';

const EventsPage = ({ user, loading, getAllEvents, allevents, getProfile }) => {
  useEffect(() => {
    getAllEvents();
    getProfile(user._id);
  }, [getAllEvents, getProfile]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Alert />
          <div className='content-container'>
            <div className='landing-intro'>
              <h1 style={{ marginBottom: '1rem' }}>
                <span className='red-span'>Newbsanity</span>{' '}
                <span className='low-weight-span'>Events and Registration</span>
              </h1>
              <p style={{ marginBottom: '1rem' }}>
                This is where you can like, comment and register for all
                available Newbsanity events! Newbsanity events are like Pokemon.
                Imagine registering is like "catching" in this example...
              </p>
            </div>
            <h3 style={{ marginBottom: '2rem' }}>
              <span className='red-span'>All</span>{' '}
              <span className='low-weight-span'>Events</span>
            </h3>
            <Fragment>
              <div className='event-grid-main'>
                {allevents.length > 0 ? (
                  allevents.map((event) => (
                    <FullEvent key={event._id} event={event} user={user} />
                  ))
                ) : (
                  <p>No Events at this time...</p>
                )}
              </div>
            </Fragment>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EventsPage.propTypes = {
  getAllEvents: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  allevents: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  allevents: state.events.allevents,
  loading: state.events.loading,
});

export default connect(mapStateToProps, { getAllEvents, getProfile })(
  EventsPage
);
