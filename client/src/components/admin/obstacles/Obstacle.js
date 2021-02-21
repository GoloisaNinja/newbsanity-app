import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminDeleteObstacle } from '../../../actions/admin';
import Modal from '../../Modal';

const Obstacle = ({ obstacle, adminDeleteObstacle }) => {
  const [show, setShow] = useState(false);
  const [obstacleId, setObstacleId] = useState('');
  const [content, setContent] = useState();

  const handleDelete = (id) => {
    setObstacleId(id);
    setContent({
      title: 'Delete This Obstacle?',
      body: `Are you sure you want to nuke this obstacle?`,
      icon: '/img/bomb.png',
      type: 'decision',
    });
    setShow(true);
  };

  const handleClose = (shouldDelete) => {
    setShow(false);
    if (shouldDelete) {
      adminDeleteObstacle(obstacleId);
    }
  };
  const [openText, setOpenText] = useState(false);
  return (
    <Fragment>
      <div className='obstacle-card-container' key={obstacle._id}>
        <div className='obstacle-card-inner'>
          <div className='user-card__avatar'>
            <Link to={`/admin/obstacle/${obstacle._id}`}>
              <img
                className='obstacle-card-img'
                src={obstacle.src}
                loading='lazy'
                alt={obstacle.name1}
              />
            </Link>
          </div>
          <div id='hide-sm' className='obstacle-card__details'>
            {obstacle._id}
          </div>
          <div className='obstacle-card__details'>
            {obstacle.name2
              ? obstacle.name1 + ' ' + obstacle.name2
              : obstacle.name1}
          </div>

          <button
            onClick={(e) => setOpenText(!openText)}
            style={{
              background: 'none',
              cursor: 'pointer',
              border: 'none',
              fontSize: '1.2rem',
              fontFamily: 'Oswald, sans-serif',
              textTransform: 'uppercase',
            }}>
            <div style={{ maxWidth: '70px' }} className='obstacle-card__text'>
              {obstacle.description}
            </div>
          </button>

          <div>
            <button
              style={{ marginTop: '1rem' }}
              className='btn user-delete'
              onClick={(e) => handleDelete(obstacle._id)}>
              <i className='fas fa-trash-alt' />
            </button>
          </div>
        </div>
        {openText && (
          <Fragment>
            <div
              style={{
                marginLeft: '2rem',
                marginBottom: '1rem',
                maxWidth: '80%',
                borderBottom: '3px solid #ff0a0a',
                fontSize: '1.4rem',
              }}>
              <p style={{ marginBottom: '.5rem', fontSize: '1.4rem' }}>
                {obstacle.description}
              </p>
            </div>
          </Fragment>
        )}
      </div>

      <Modal show={show} handleClose={handleClose} content={content} />
    </Fragment>
  );
};

Obstacle.propTypes = {
  obstacle: PropTypes.object.isRequired,
  adminDeleteObstacle: PropTypes.func.isRequired,
};

export default connect(null, { adminDeleteObstacle })(Obstacle);
