import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../Alert';
import AddEventForm from './AddEventForm';

const AddEvent = () => {
  return (
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
            <span className='red-span'>Add</span>{' '}
            <span className='low-weight-span'> Event</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Events are the life blood of Newbsanity. If Oden used ravens to get
            tales of Viking Warriors from Midgard, then Newbsanity Events are
            flying Velociraptors smacked up on freaking meth made by walter
            freaking white. Events tell the tales of Newbsanity to the gods, and
            your clients. And clients help you bling out your bathrobe. So use
            the tool below to make an event, and make it look good. Your
            bathrobe depends on it.
          </p>
          <p style={{ marginBottom: '1rem' }}>Fields with an * are required.</p>
        </div>
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>Event </span>{' '}
          <span className='low-weight-span'>Preview</span>
        </h3>
        <AddEventForm />
      </div>
    </Fragment>
  );
};

export default AddEvent;
