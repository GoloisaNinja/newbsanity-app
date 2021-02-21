import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminEditObstacle } from '../../../actions/admin';

const EditObstacleForm = ({ obstacle, history, adminEditObstacle }) => {
  const [formData, setFormData] = useState({
    name1: '',
    name2: '',
    src: '',
    description: '',
  });

  const { name1, name2, src, description } = formData;

  useEffect(() => {
    setFormData({
      name1: !obstacle.name1 ? '' : obstacle.name1,
      name2: !obstacle.name2 ? '' : obstacle.name2,
      src: !obstacle.src ? '' : obstacle.src,
      description: !obstacle.description ? '' : obstacle.description,
    });
  }, [obstacle, setFormData]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    adminEditObstacle(formData, obstacle._id, history);
  };

  return (
    <div className='admin-edit-obstacle-grid'>
      <div className='edit-obstacle-container'>
        <div className='obstacle-container-img'>
          <img
            style={{ height: '100%' }}
            src={src}
            loading='lazy'
            alt={`Newbsanity people near obstacle named ${name1}`}
          />
          <div className='img-overlay'>
            <div className='text-overlay'>
              <h2 style={{ padding: '0 2rem' }} className='event-title'>
                {name1}{' '}
                <span className='low-weight-span'>{name2 ? name2 : ''}</span>
              </h2>
            </div>
          </div>
        </div>
        <div
          style={{ borderBottom: '3px solid #ff0a0a' }}
          className='obstacle-container-description'>
          <p className='event-text'>{description}</p>
        </div>
      </div>
      <div className='form-container'>
        <form className='form-profile' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label className='profile-label' htmlFor='name1'>
              * First word of Obstacle Name
            </label>
            <input
              className='form-input'
              required
              type='text'
              id='name1'
              name='name1'
              value={name1}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label className='profile-label' htmlFor='name2'>
              Remaining words of Obtacle Name
            </label>
            <input
              className='form-input'
              type='text'
              id='name2'
              name='name2'
              value={name2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label className='profile-label' htmlFor='src'>
              * Image hosting source location
            </label>
            <input
              className='form-input'
              required
              type='text'
              id='src'
              name='src'
              value={src}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label className='profile-label' htmlFor='description'>
              * Text description of obstacle
            </label>
            <textarea
              className='form-input'
              required
              cols='30'
              rows='8'
              type='text'
              id='description'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <input
              type='submit'
              className='btn profile-submit'
              value='Edit Obstacle'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

EditObstacleForm.propTypes = {
  obstacle: PropTypes.object.isRequired,
  adminEditObstacle: PropTypes.func.isRequired,
};

export default connect(null, { adminEditObstacle })(
  withRouter(EditObstacleForm)
);
