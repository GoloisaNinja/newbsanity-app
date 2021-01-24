import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerForEvent, likeEvent, unlikeEvent } from '../../actions/events';
import events from '../../reducers/events';

const FullEvent = ({
  event,
  user,
  registerForEvent,
  likeEvent,
  unlikeEvent,
}) => {
  const [comment, setComment] = useState('');

  const checkDate = (eventDate) => {
    const formatDate = eventDate.slice(0, 10);
    const dateParts = formatDate.split('-');
    const eventDateObject = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2]
    );
    const today = new Date();
    return eventDateObject < today;
  };

  const checkRegistered = () => {
    for (let i = 0; i < event.registration.length; i++) {
      if (event.registration[i]['user'] === user._id) {
        return true;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerForEvent(event._id, comment);
    setComment('');
  };

  return (
    <Fragment>
      <div className='flex-container-event'>
        <div>
          {event.mediaTypeIframe ? (
            <iframe
              src={event.mediaLink}
              title={event.title}
              className='allevent-img'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen></iframe>
          ) : (
            <img
              className='allevent-img'
              src={event.mediaLink}
              alt={event.title}
            />
          )}
        </div>

        <div>
          <h3 className='event-title'>
            {event.title} <span className='low-weight-span'></span>
          </h3>
          <h5 style={{ paddingLeft: '2rem' }}>
            Date:{' '}
            <span className='low-weight-span'>{event.date.slice(0, 10)}</span>
          </h5>
          <h5 style={{ paddingLeft: '2rem' }}>
            Time: <span className='low-weight-span'>{event.time}</span>
          </h5>
          <p className='event-text'>{event.text}</p>
          <div className='post-social-container'>
            <button
              className='btn post-like'
              onClick={(e) => likeEvent(event._id)}>
              <i className='far fa-thumbs-up' />{' '}
              {event.likes.length > 0 && <span>{event.likes.length}</span>}
            </button>
            <button
              className='btn post-like'
              onClick={(e) => unlikeEvent(event._id)}>
              <i className='far fa-thumbs-down' />
            </button>
            <Link className='btn post-discussion' to={`/event/${event._id}`}>
              Discussion{' '}
              {event.comments.length > 0 && (
                <span>{event.comments.length}</span>
              )}
            </Link>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <div
              style={{
                padding: '2rem',
                width: '100%',
              }}>
              <h5 style={{ marginBottom: '2rem' }}>
                {checkDate(event.date)
                  ? 'Past Events cannot be registered for.'
                  : checkRegistered()
                  ? 'You already registeed for this event.'
                  : `Register for ${event.title}!`}
              </h5>

              <form onSubmit={(e) => handleSubmit(e)}>
                <textarea
                  className='event-regForm-textArea'
                  cols='30'
                  rows='4'
                  value={comment}
                  placeholder='enter registration related comments (e.g. desired bib #, elite class, etc.)'
                  onChange={(e) => setComment(e.target.value)}></textarea>
                <input
                  className='event-regForm-submit'
                  type='submit'
                  disabled={checkDate(event.date) || checkRegistered()}
                  value='Register'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

FullEvent.propTypes = {
  user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  registerForEvent: PropTypes.func.isRequired,
  likeEvent: PropTypes.func.isRequired,
  unlikeEvent: PropTypes.func.isRequired,
};

export default connect(null, { registerForEvent, likeEvent, unlikeEvent })(
  FullEvent
);
