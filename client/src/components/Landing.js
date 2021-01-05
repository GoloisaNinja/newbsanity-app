import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Event from '../components/Event';
import { getLandingEvents } from '../actions/events';
import Spinner from './Spinner';

const Landing = ({ loading, getLandingEvents, landingEvents }) => {
  useEffect(() => {
    getLandingEvents();
  }, [getLandingEvents]);
  return (
    <div className='content-container'>
      <div className='landing-intro'>
        <h1 style={{ marginBottom: '1rem' }}>
          <span className='red-span'>Welcome</span>{' '}
          <span className='low-weight-span'>to Newbsanity</span>
        </h1>
        <p style={{ marginBottom: '1rem' }}>
          Newbsanity is the premier fitness experience in the northeast. Check
          out our events, obstacles and workout plans/pricing. Sign in to log
          workouts, chat in the forums and get exclusive member benefits.
        </p>
      </div>
      <h3>
        <span className='red-span'>Upcoming</span>{' '}
        <span className='low-weight-span'>Events</span>
        <span style={{ fontSize: '1rem' }}>
          {' '}
          - click event for more details
        </span>
      </h3>
      <Fragment>
        {!loading && landingEvents.length > 0 ? (
          <Event events={landingEvents} />
        ) : (
          <Spinner />
        )}
      </Fragment>

      <button className='btn btn-red'>
        Full <span className='low-weight-span'>event listing</span>
      </button>
      <h3>
        <span className='red-span'>Thank you</span>{' '}
        <span className='low-weight-span'>to our local sponsors!</span>
      </h3>
      <div className='landing-sponsors'>
        <img className='landing-sponsors__img' src='./img/1.png' />
        <img className='landing-sponsors__img' src='./img/2.png' />
        <img className='landing-sponsors__img' src='./img/3.png' />
      </div>
    </div>
  );
};

Landing.propTypes = {
  getLandingEvents: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  landingEvents: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.events.loading,
  landingEvents: state.events.events,
});

export default connect(mapStateToProps, { getLandingEvents })(Landing);
