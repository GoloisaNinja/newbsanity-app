import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvent } from '../../actions/events';
import Spinner from '../Spinner';
import Alert from '../Alert';
import EventCommentForm from './EventCommentForm';
import EventCommentItem from './EventCommentItem';
import EventItem from './EventItem';

const Event = ({ getEvent, events: { event, loading }, match }) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);

  return loading || event === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <div className="content-container">
        <div style={{ marginBottom: '2.5rem', marginTop: '.25rem' }}>
          <Link to="/events" className="btn btn-forum">
            Back <span className="low-weight-span">to Events</span>
          </Link>
        </div>
        <EventItem event={event} />
        <h3 className="text-type-effect2">
          <i className="far fa-comments" />{' '}
          <span className="red-span"> Leave</span>{' '}
          <span className="low-weight-span">a comment...</span>{' '}
        </h3>
        <EventCommentForm eventId={event._id} />
        <Fragment>
          {event.comments.length > 0 ? (
            <Fragment>
              {event.comments.map((comment) => (
                <EventCommentItem
                  key={comment._id}
                  comment={comment}
                  eventId={event._id}
                />
              ))}
            </Fragment>
          ) : (
            <div>No comments yet...</div>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

Event.propTypes = {
  events: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, { getEvent })(Event);
