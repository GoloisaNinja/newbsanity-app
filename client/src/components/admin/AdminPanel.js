import React, { Fragment } from 'react';
import AtAGlanceUsers from './AtAGlanceUsers';
import AtAGlanceRegistration from './AtAGlanceRegistration';
import AtAGlanceWorkouts from './AtAGlanceWorkouts';
import AtAGlancePosts from './AtAGlancePosts';
import AdminActions from './AdminActions';

const AdminPanel = () => {
  return (
    <Fragment>
      <div className='content-container'>
        <div className='landing-intro'>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>Newbsanity</span>{' '}
            <span className='low-weight-span'> Admin Panel</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Congratulations on being a Newbsanity Admin! So many wonderful
            adventures await you in this glorious realm of adminstrative duties!
            Insert new obstacles! Create new events! Check your user base and
            registrations! Learn how to sew a realistic looking lightsaber from
            old socks and discarded nuclear materials!
          </p>
        </div>
        <h3>
          <span className='red-span'>Activity </span>{' '}
          <span className='low-weight-span'>At-A Glance</span>
        </h3>
        <div className='admin-glance-grid'>
          <AtAGlanceUsers />
          <AtAGlanceRegistration />
          <AtAGlanceWorkouts />
          <AtAGlancePosts />
        </div>
        <h3 style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <span className='red-span'>Admin </span>{' '}
          <span className='low-weight-span'>Panel</span>
        </h3>
        <AdminActions />
      </div>
    </Fragment>
  );
};

export default AdminPanel;
