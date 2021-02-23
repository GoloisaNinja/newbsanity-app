import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminDeleteEvent } from '../../../actions/admin';
import Modal from '../../Modal';

const Event = ({ event, adminDeleteEvent }) => {
  const [show, setShow] = useState(false);
  const [eventId, setEventId] = useState('');
  const [content, setContent] = useState();

  const handleDelete = (id) => {
    setEventId(id);
    setContent({
      title: 'Delete This Event?',
      body: `Are you sure you want to nuke ${event.title}?`,
      icon: '/img/bomb.png',
      type: 'decision',
    });
    setShow(true);
  };

  const handleClose = (shouldDelete) => {
    setShow(false);
    if (shouldDelete) {
      adminDeleteEvent(eventId);
    }
  };
  const [openText, setOpenText] = useState(false);
  return (
    <Fragment>
      <div className='event-card-container' key={event._id}>
        <div className='event-card-inner'>
          <div className='user-card__avatar'>
            {event.mediaTypeIframe ? (
              <iframe
                src={event.mediaLink}
                title={event.title}
                loading='lazy'
                className='event-card-img'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen></iframe>
            ) : (
              <img
                className='event-card-img'
                src={event.mediaLink}
                loading='lazy'
                alt={event.title}
              />
            )}
          </div>
          <div id='hide-sm' className='event-card__details'>
            {event._id}
          </div>
          <div id='hide-sm' className='event-card__details'>
            {event.date.slice(0, 10)}
          </div>
          <Link style={{ color: '#0e1013' }} to={`/admin/event/${event._id}`}>
            <div style={{ maxWidth: '90px' }} className='event-card__details'>
              {event.title}
            </div>
          </Link>

          <button
            onClick={(e) => setOpenText(!openText)}
            style={{
              background: 'none',
              cursor: 'pointer',
              border: 'none',
              fontSize: '1.2rem',
              fontFamily: 'Oswald, sans-serif',
              textTransform: 'uppercase',
            }}>
            <div style={{ maxWidth: '70px' }} className='event-card__text'>
              {event.text}
            </div>
          </button>

          <div>
            <button
              style={{ marginTop: '1rem' }}
              className='btn user-delete'
              onClick={(e) => handleDelete(event._id)}>
              <i className='fas fa-trash-alt' />
            </button>
          </div>
        </div>
        {openText && (
          <Fragment>
            <div
              style={{
                marginLeft: '2rem',
                marginBottom: '1rem',
                maxWidth: '80%',
                borderBottom: '3px solid #ff0a0a',
                fontSize: '1.4rem',
              }}>
              <p style={{ marginBottom: '.5rem', fontSize: '1.4rem' }}>
                {event.text}
              </p>
            </div>
          </Fragment>
        )}
      </div>

      <Modal show={show} handleClose={handleClose} content={content} />
    </Fragment>
  );
};

Event.propTypes = {
  event: PropTypes.object.isRequired,
  adminDeleteEvent: PropTypes.func.isRequired,
};

export default connect(null, { adminDeleteEvent })(Event);
