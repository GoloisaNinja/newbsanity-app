import React from 'react';
import { Link } from 'react-router-dom';

const EventActions = () => {
  return (
    <div className='profile-actions'>
      <Link to='/admin/events/add'>
        <button className='btn profile-action'>
          <i className='fas fa-skull-crossbones' /> Add New Event
        </button>
      </Link>
    </div>
  );
};

export default EventActions;
