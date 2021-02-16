import React, { Fragment } from 'react';
import Alert from '../../Alert';
import User from './User';

const UserPanel = () => {
  return (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div className='landing-intro'>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>User</span>{' '}
            <span className='low-weight-span'> Admin Panel</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Use this panel to manage Newbsaniacs. See below for available Admin
            Actions.
          </p>
        </div>
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>All </span>{' '}
          <span className='low-weight-span'>Users</span>
        </h3>

        <User />
      </div>
    </Fragment>
  );
};

export default UserPanel;
