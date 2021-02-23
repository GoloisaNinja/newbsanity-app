import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../../Alert';
import { getEvent } from '../../../actions/events';
import EditEventForm from './EditEventForm';
import Spinner from '../../Spinner';

const EditEvent = ({ getEvent, match, events: { loading, event } }) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);
  return loading || event === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div className='landing-intro'>
          <div style={{ marginBottom: '2rem' }}>
            <Link to='/admin/events' className='btn profile-social'>
              Go Back to Events
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>Edit</span>{' '}
            <span className='low-weight-span'> Event</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            {`You can edit the details for ${event.title} below.`}
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Your changes will occur in real-time. Be sure to check your horrible
            spelling! And remember that it is extremely critical to be mindful
            of your media type. YouTube videos display much differently than
            basic images. Double check your media link and media type form
            fields before hitting the edit button!
          </p>
          <p style={{ marginBottom: '1rem' }}>
            You should only need to use the change media type button if you are
            changing from a Youtube video to an image or vice versa. The current
            media type of the event pulls in by default. Really look at your
            event preview! If it looks jank it is probably because you changed
            the media type when you really shouldn't have.
          </p>
          <p style={{ marginBottom: '1rem' }}>Fields with an * are required.</p>
        </div>
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>Event </span>{' '}
          <span className='low-weight-span'>Edit Preview</span>
        </h3>
        <EditEventForm event={event} />
      </div>
    </Fragment>
  );
};

EditEvent.propTypes = {
  getEvent: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, { getEvent })(EditEvent);
