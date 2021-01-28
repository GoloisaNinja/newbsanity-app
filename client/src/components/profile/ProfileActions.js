import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className='profile-actions'>
      <Link to='/profile'>
        <button className='btn profile-action'>
          <i className='fas fa-id-badge' /> Create/edit Profile
        </button>
      </Link>
      <Link to='/events'>
        <button className='btn profile-action'>
          <i className='fas fa-calendar-alt' /> View/register Events
        </button>
      </Link>
      <Link to='/workouts'>
        <button className='btn profile-action'>
          <i className='fas fa-dumbbell' /> Create/edit workout
        </button>
      </Link>
    </div>
  );
};

export default ProfileActions;
