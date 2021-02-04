import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import {
  registerForEvent,
  unRegisterForEvent,
  likeEvent,
  unlikeEvent,
} from '../../actions/events';

const FullEvent = ({
  event,
  user,
  registerForEvent,
  unRegisterForEvent,
  likeEvent,
  unlikeEvent,
  profile: { profile },
}) => {
  const [comment, setComment] = useState('');
  const [expired, setExpired] = useState(false);
  const [isRegistered, setIsRegistered] = useState();
  const [show, setShow] = useState(false);

  const checkDate = () => {
    const formatDate = event.date.slice(0, 10);
    const dateParts = formatDate.split('-');
    const eventDateObject = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2]
    );
    const today = new Date();
    if (eventDateObject < today) {
      setExpired(true);
    }
  };
  useEffect(() => {
    checkDate();
  }, []);

  const checkRegistered = () => {
    for (let i = 0; i < event.registration.length; i++) {
      if (event.registration[i]['user'] === user._id) {
        setIsRegistered(true);
      }
    }
  };

  useEffect(() => {
    checkRegistered();
  }, [event]);

  const content = {
    title: isRegistered
      ? `Unregister for ${event.title}`
      : `Register for ${event.title}`,
    body: isRegistered
      ? `Are you sure you want to unregister for ${event.title}?`
      : `Are you sure you want to register for ${event.title}?`,
    icon: '/img/crossbone.png',
  };

  const handleClose = (shouldAction) => {
    setShow(false);
    if (shouldAction) {
      if (!isRegistered) {
        registerForEvent(event._id, comment);
        setComment('');
        setIsRegistered(true);
      } else {
        unRegisterForEvent(event._id);
        setComment('');
        setIsRegistered(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <Fragment>
      <div className='flex-container-event'>
        <div>
          {event.mediaTypeIframe ? (
            <iframe
              src={event.mediaLink}
              title={event.title}
              loading='lazy'
              className='allevent-img'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen></iframe>
          ) : (
            <img
              className='allevent-img'
              src={event.mediaLink}
              loading='lazy'
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
                {profile === null
                  ? 'You have to have a profile to register for events'
                  : expired
                  ? 'Past Events cannot be registered/unregistered.'
                  : isRegistered
                  ? 'You already registered for this event.'
                  : `Register for ${event.title}!`}
              </h5>

              <form onSubmit={(e) => handleSubmit(e)}>
                <label
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 300,
                  }}>
                  **Optional** Before you click register you can enter event
                  info like desired bib number
                </label>
                <textarea
                  className='event-regForm-textArea'
                  placeholder='enter your info here...'
                  cols='30'
                  rows='4'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}></textarea>
                {isRegistered ? (
                  <input
                    className='event-regForm-submit-unreg'
                    type='submit'
                    disabled={profile === null || expired}
                    value='Unregister'
                  />
                ) : (
                  <input
                    className='event-regForm-submit'
                    type='submit'
                    disabled={profile === null || expired}
                    value='Register'
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} handleClose={handleClose} content={content} />
    </Fragment>
  );
};

FullEvent.propTypes = {
  user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  registerForEvent: PropTypes.func.isRequired,
  unRegisterForEvent: PropTypes.func.isRequired,
  likeEvent: PropTypes.func.isRequired,
  unlikeEvent: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  registerForEvent,
  unRegisterForEvent,
  likeEvent,
  unlikeEvent,
})(FullEvent);
