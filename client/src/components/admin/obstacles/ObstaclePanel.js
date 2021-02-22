import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../Alert';
import ObstacleActions from './ObstacleActions';
import Obstacles from './Obstacles';

const ObstaclePanel = () => {
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
            <span className='red-span'>Obstacle</span>{' '}
            <span className='low-weight-span'> Admin Panel</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Use this panel to manage Newbsanity Obstacles. See below for
            available Admin Actions. Obstacle cards are ordered in the following
            fashion:
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
                obstacle image
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                obstacle id - hidden on small devices
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                obstacle name
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                obstacle text
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                delete obstacle action
              </li>
            </ul>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            If an obstacle is deleted it cannot be retrieved. Only delete a
            obstacle if it should be removed, or if said obstacle is no longer
            cool and you don't want your members getting sus about you being a
            hipster.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Obstacle text is cut off to conserve space, full obstacle text can
            be viewed by clicking on the start of the obstacle text. The card
            will expand to show the full obstacle text.
          </p>
        </div>
        <ObstacleActions />
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>All </span>{' '}
          <span className='low-weight-span'>Obstacles</span>
        </h3>
        <Obstacles />
      </div>
    </Fragment>
  );
};

export default ObstaclePanel;
