import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editAvatar } from '../../../actions/auth';
import Alert from '../../Alert';

const Avatar = ({ history, editAvatar }) => {
  const [file, setFile] = useState();

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', file);
    editAvatar(formData, history);
  };

  return (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div style={{ marginBottom: '2rem' }}>
          <Link to='/dashboard' className='btn profile-social'>
            Go Back to Dashboard
          </Link>
        </div>

        <div className='landing-intro'>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>Create/Edit</span>{' '}
            <span className='low-weight-span'>your avatar</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Newbsanity, as well as humanity, asks that you be reasonable in your
            avatar choice. Please, no offensive or inappropriate images. An
            image of an enemy face-planting on the mud gauntlet is totally
            acceptable and encouraged.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            *Please note that only image files (JPEG, JPG, PNG) can be uploaded.
          </p>
        </div>

        <div className='form-container'>
          <form
            className='form-profile'
            encType='multipart/form-data'
            onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label className='profile-label' htmlFor='avatar'>
                Choose an image to use as your avatar
              </label>
              <input
                style={{ background: '#fff' }}
                type='file'
                required
                className='form-input'
                id='avatar'
                name='avatar'
                accept='image/*'
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <input
                type='submit'
                className='btn profile-submit'
                value='upload your avatar'
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { editAvatar })(withRouter(Avatar));
