import React from 'react';
import { Link } from 'react-router-dom';

const AdminActions = () => {
  return (
    <div className='admin-actions-grid'>
      <div className='action-grid-one'>
        <Link to='/admin/users'>
          <button
            style={{ marginBottom: '2rem', width: '100%' }}
            className='btn profile-action'>
            <i className='fas fa-user-shield' /> User Panel
          </button>
        </Link>

        <Link to='/admin/obstacles'>
          <button
            style={{ marginBottom: '2rem', width: '100%' }}
            className='btn profile-action'>
            <i className='fas fa-user-shield' /> Obstacle Panel
          </button>
        </Link>
        <Link to='/admin/events'>
          <button
            style={{ marginBottom: '2rem', width: '100%' }}
            className='btn profile-action'>
            <i className='fas fa-user-shield' /> Event Panel
          </button>
        </Link>
      </div>
      <div className='action-grid-two'>
        <Link to='/admin/posts'>
          <button
            style={{ marginBottom: '2rem', width: '100%' }}
            className='btn profile-action'>
            <i className='fas fa-user-shield' /> Post Panel
          </button>
        </Link>
        <Link to='/admin/workouts'>
          <button
            style={{ marginBottom: '2rem', width: '100%' }}
            className='btn profile-action'>
            <i className='fas fa-user-shield' /> Workout Panel
          </button>
        </Link>
        <Link to='/admin/trophies'>
          <button
            style={{ marginBottom: '2rem', width: '100%' }}
            className='btn profile-action'>
            <i className='fas fa-user-shield' /> Trophy Panel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminActions;
