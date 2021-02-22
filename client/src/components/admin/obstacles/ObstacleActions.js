import React from 'react';
import { Link } from 'react-router-dom';

const ObstacleActions = () => {
  return (
    <div className='profile-actions'>
      <Link to='/admin/obstacles/add'>
        <button className='btn profile-action'>
          <i className='fas fa-skull-crossbones' /> Add New Obstacle
        </button>
      </Link>
    </div>
  );
};

export default ObstacleActions;
