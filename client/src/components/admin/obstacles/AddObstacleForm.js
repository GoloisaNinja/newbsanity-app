import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminAddObstacle } from '../../../actions/admin';
import Modal from '../../Modal';

const AddObstacleForm = ({ adminAddObstacle }) => {
  const [formData, setFormData] = useState({
    name1: 'Failure',
    name2: 'Mountain',
    src: '/img/failure.jpg',
    description: `You feel the wind in your hair. You hear the cheers and the praise of all your peers far below you. You've ascended the most epic and extreme obstacle crafted by mortals. You are about to claim your victory flagon of winner's mead when your hand slips. You fall one and half feet to the hard ground. There were no cheers. You are alone. You've fallen out of bed and peed yourself. The only thing you've ascended today is failure mountain bitch.`,
  });

  const { name1, name2, src, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setContent({
      title: 'Add Obstacle',
      body: `This could get grim. Are you sure you want to add ${name1} ${name2} to the Newbsanity Obstacle Stable?`,
      icon: '/img/grim-reaper.png',
      type: 'decision',
    });
    setShow(true);
  };

  const handleClose = (shouldEdit) => {
    setShow(false);
    if (shouldEdit) {
      adminAddObstacle(formData);
      setFormData({
        name1: 'Failure',
        name2: 'Mountain',
        src: '/img/fallfail.jpg',
        description: `You feel the wind in your hair. You hear the cheers and the praise of all your peers far below you. You've ascended the most epic and extreme obstacle crafted by mortals. You are about to claim your victory flagon of winner's mead when your hand slips. You fall one and half feet to the hard ground. There were no cheers. You are alone. You've fallen out of bed and peed yourself. The only thing you've ascended today is failure mountain bitch.`,
      });
    }
  };
  const [show, setShow] = useState(false);
  const [content, setContent] = useState();

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
      <div className='obstacle-form-container'>
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
              value='Add Obstacle'
            />
          </div>
        </form>
      </div>
      <Modal show={show} handleClose={handleClose} content={content} />
    </div>
  );
};

AddObstacleForm.propTypes = {
  adminAddObstacle: PropTypes.func.isRequired,
};

export default connect(null, { adminAddObstacle })(AddObstacleForm);
