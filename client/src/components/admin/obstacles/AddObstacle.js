import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../Alert';
import AddObstacleForm from './AddObstacleForm';

const AddObstacle = () => {
  return (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div className='landing-intro'>
          <div style={{ marginBottom: '2rem' }}>
            <Link to='/admin/obstacles' className='btn profile-social'>
              Go Back to Obstacles
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>Add</span>{' '}
            <span className='low-weight-span'> Obstacle</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Think of this as your canvas. What would Monet or Bob Ross do?
            They'd paint a freaking masterpiece, that's what they'd do. And
            that's exactly what you can do here. But with obstacles. Use the
            form below to create the mona lisa of extreme!
          </p>
          <p style={{ marginBottom: '1rem' }}>Fields with an * are required.</p>
        </div>
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>Obstacle </span>{' '}
          <span className='low-weight-span'>Preview</span>
        </h3>
        <AddObstacleForm />
      </div>
    </Fragment>
  );
};

export default AddObstacle;
