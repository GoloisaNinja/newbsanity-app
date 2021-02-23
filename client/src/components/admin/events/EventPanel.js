import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../Alert';
import EventActions from './EventActions';
import Events from './Events';

const EventPanel = () => {
  return (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div className='landing-intro'>
          <div style={{ marginBottom: '1rem' }}>
            <Link to='/admin' className='btn profile-social'>
              Go Back to Main Admin
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>Events</span>{' '}
            <span className='low-weight-span'> Admin Panel</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Use this panel to manage Newbsanity Events. See below for available
            Admin Actions. Event cards are ordered in the following fashion:
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ul style={{ marginBottom: '1rem' }}>
              <li
                style={{
                  fontWeight: 400,
                  fontSize: '1.4rem',
                  color: '#fff',
                }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                Event image
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                event id - hidden on small devices
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                Event Title
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                Event Date - hidden on small devices
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                Event text
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                delete event action
              </li>
            </ul>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            If an event is deleted it cannot be retrieved. Only delete an event
            if it should be removed, or if you like messing with people that
            have already signed up for said event and you plan on ghosting them
            for laughs.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Event text is cut off to conserve space, full event text can be
            viewed by clicking on the start of the event text. The card will
            expand to show the full event text.
          </p>
        </div>
        <EventActions />
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>All </span>{' '}
          <span className='low-weight-span'>Events</span>
        </h3>
        <Events />
      </div>
    </Fragment>
  );
};

export default EventPanel;
