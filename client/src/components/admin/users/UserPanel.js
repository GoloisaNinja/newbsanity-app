import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../Alert';
import Users from './Users';
import UsersFilters from './UsersFilters';

const UserPanel = () => {
  return (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div className='landing-intro'>
          <div style={{ marginBottom: '2rem' }}>
            <Link to='/admin' className='btn profile-social'>
              Go Back to Main Admin
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>User</span>{' '}
            <span className='low-weight-span'> Admin Panel</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Use this panel to manage Newbsaniacs. See below for available Admin
            Actions. User cards are ordered in the following fashion:
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
                user avatar
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                user id - hidden on small devices
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                user name
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                user email
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                app join date - hidden on small devices
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                login count - hidden on small devices
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                delete user action
              </li>
            </ul>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            Please note that clicking the user's avatar will allow you to delete
            just the user avatar, should it be offensive, or if you just don't
            like that person and want to mess with them.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Clicking the user's name will allow you to edit that user's admin
            access. Please be extremely careful to whom you grant admin access.
            You wouldn't want to give it to a guy that erases white board course
            clues for example...
          </p>
          <p style={{ marginBottom: '1rem' }}>
            User searches are matched to User Name.
          </p>
        </div>
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>All </span>{' '}
          <span className='low-weight-span'>Users</span>
        </h3>
        <UsersFilters />
        <Users />
      </div>
    </Fragment>
  );
};

export default UserPanel;
