import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminAddEvent } from '../../../actions/admin';
import Modal from '../../Modal';

const AddEventForm = ({ adminAddEvent }) => {
  const [formData, setFormData] = useState({
    title: 'Jumpy Jump Times',
    mediaLink: 'https://i.imgur.com/uVA8J21.jpg',
    mediaTypeIframe: false,
    date: '2021-12-31',
    time: '3 AM',
    text: `Best time for jumpy jumps is at 3am. I won't take no for answer. You will come. You will jumpy jump. If you miss a jumpy jump, you become a lumpy lump and in the air my fist will pump. Because I am the best at jumpy jump and have never missed a jump I jumped. And from Newbsanity list of champions, you have now been bumped.`,
  });

  const { title, mediaLink, mediaTypeIframe, date, time, text } = formData;
  const [modType, setModType] = useState('');
  const [mediaType, setMediaType] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setModType('event');
    setContent({
      title: 'Add Event',
      body: `Does everything look good? Would Oden be proud? Are you sure you want to add ${title} to Newbsanity Events?`,
      icon: '/img/viking.png',
      type: 'decision',
    });
    setShow(true);
  };

  const handleClose = (shouldEdit) => {
    setShow(false);
    if (shouldEdit && modType === 'event') {
      adminAddEvent(formData);
      setFormData({
        title: 'Jumpy Jump Times',
        mediaLink: 'https://i.imgur.com/uVA8J21.jpg',
        mediaTypeIframe: false,
        date: '2021-12-31',
        time: '3 AM',
        text: `Best time for jumpy jumps is at 3am. I won't take no for answer. You will come. You will jumpy jump. If you miss a jumpy jump, you become a lumpy lump and in the air my fist will pump. Because I am the best at jumpy jump and have never missed a jump I jumped. And from Newbsanity list of champions, you have now been bumped.`,
      });
      setMediaType(false);
    } else if (shouldEdit && modType === 'media') {
      setMediaType(!mediaType);
      setFormData({
        ...formData,
        mediaTypeIframe: !mediaType,
      });
    }
  };
  const [show, setShow] = useState(false);
  const [content, setContent] = useState();

  const handleMedia = () => {
    setModType('media');
    setContent({
      title: 'Change Media Type',
      body: `This means you are changing media type. This is serious, are you sure?`,
      icon: '/img/grim-reaper.png',
      type: 'decision',
    });
    setShow(true);
  };

  return (
    <Fragment>
      <div style={{ marginBottom: '1rem' }}>
        <p>Current Edit Media Type: {mediaType ? 'YouTube Video' : 'Image'}</p>
        <button onClick={(e) => handleMedia(e)} className='btn'>
          Change Media Type
        </button>
      </div>
      <div className='admin-edit-obstacle-grid'>
        <div className='flex-event-edit-container'>
          <div className='flex-event-edit-contents'>
            <div>
              {mediaType ? (
                <iframe
                  src={mediaLink}
                  loading='lazy'
                  title={title}
                  className='edit-event-img'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen></iframe>
              ) : (
                <img
                  className='edit-event-img'
                  loading='lazy'
                  src={mediaLink}
                  alt={title}
                />
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className='event-title'>
                {title} <span className='low-weight-span'></span>
              </h3>
              <h5 style={{ paddingLeft: '2rem' }}>
                Date: <span className='low-weight-span'>{date}</span>
              </h5>
              <h5 style={{ paddingLeft: '2rem' }}>
                Time: <span className='low-weight-span'>{time}</span>
              </h5>
              <p className='event-text'>{text}</p>
            </div>
          </div>
        </div>
        <div className='obstacle-form-container'>
          <form className='form-profile' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label className='profile-label' htmlFor='title'>
                * Event Title
              </label>
              <input
                className='form-input'
                required
                type='text'
                id='title'
                name='title'
                value={title}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label className='profile-label' htmlFor='date'>
                * Event Date
              </label>
              <input
                className='form-input'
                type='date'
                id='date'
                required
                name='date'
                value={date}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label className='profile-label' htmlFor='time'>
                * Event Time (ex. 5 PM)
              </label>
              <input
                className='form-input'
                required
                type='text'
                id='time'
                name='time'
                value={time}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label className='profile-label' htmlFor='mediaTypeIfram'>
                * Media Link for event is Youtube video
              </label>
              <select
                value={mediaType}
                disabled
                className='form-input'
                required
                name='mediaTypeIframe'
                onChange={(e) => onChange(e)}>
                <option value='0'>Is Media YouTube - true or false</option>
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
            </div>
            <div className='form-group'>
              <label className='profile-label' htmlFor='mediaLink'>
                * Media host link (img address or youtube embed)
              </label>
              <input
                className='form-input'
                required
                type='text'
                id='mediaLink'
                name='mediaLink'
                value={mediaLink}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label className='profile-label' htmlFor='text'>
                * Text description of event
              </label>
              <textarea
                className='form-input'
                required
                cols='30'
                rows='8'
                type='text'
                id='text'
                name='text'
                value={text}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <input
                type='submit'
                className='btn profile-submit'
                value='Add Event'
              />
            </div>
          </form>
        </div>
        <Modal show={show} handleClose={handleClose} content={content} />
      </div>
    </Fragment>
  );
};

AddEventForm.propTypes = {
  adminAddEvent: PropTypes.func.isRequired,
};

export default connect(null, { adminAddEvent })(AddEventForm);
