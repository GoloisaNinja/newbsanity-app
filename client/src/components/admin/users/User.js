import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  adminDeleteUserAvatar,
  adminDeleteUser,
  adminEditAdmin,
} from '../../../actions/admin';
import Modal from '../../Modal';

const User = ({
  user,
  adminDeleteUserAvatar,
  adminDeleteUser,
  adminEditAdmin,
}) => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [edit, setEdit] = useState('');
  const [content, setContent] = useState();
  const [modType, setModType] = useState();

  const handleDelete = (id, type, name) => {
    setUserId(id);
    setModType(type);
    if (type === 'avatar') {
      setContent({
        title: 'Delete User Avatar?',
        body: `Are you sure you want to delete avatar belonging to ${name}?`,
        icon: '/img/robot.png',
        type: 'decision',
      });
    }
    if (type === 'account') {
      setContent({
        title: 'Delete User Account?',
        body: `Are you sure you want to delete account belonging to ${name}?`,
        icon: '/img/robot.png',
        type: 'decision',
      });
    }
    setShow(true);
  };

  const handleClose = (shouldMod) => {
    setShow(false);
    if (shouldMod && modType === 'avatar') {
      adminDeleteUserAvatar(userId);
    } else if (shouldMod && modType === 'account') {
      adminDeleteUser(userId);
    } else if (shouldMod && modType === 'admin') {
      if (edit === 'remove') {
        adminEditAdmin(userId, edit);
      } else if (edit === 'add') {
        adminEditAdmin(userId, edit);
      }
    }
  };

  const handleAdmin = (id, type, name, edit) => {
    setUserId(id);
    setModType(type);
    setEdit(edit);
    if (edit === 'remove') {
      setContent({
        title: 'Remove User Admin Access?',
        body: `Are you sure you want to remove admin access for ${name}?`,
        icon: '/img/robot.png',
        type: 'decision',
      });
    }
    if (edit === 'add') {
      setContent({
        title: 'Add User Admin Access?',
        body: `This is serious! Are you sure you want to grant admin access for ${name}?`,
        icon: '/img/robot.png',
        type: 'decision',
      });
    }
    setShow(true);
  };

  const [openAdmin, setOpenAdmin] = useState(false);
  return (
    <Fragment>
      <div className='user-card-container' key={user._id}>
        <div className='user-card-inner'>
          <div style={{ position: 'relative' }}>
            {user.isAdmin && (
              <p
                style={{
                  position: 'absolute',
                  top: '64px',
                  left: '12px',
                  fontSize: '1rem',
                }}>
                Admin
              </p>
            )}
            <div style={{ position: 'relative' }} className='user-card__avatar'>
              {user.avatar ? (
                <button
                  onClick={(e) => handleDelete(user._id, 'avatar', user.name)}
                  style={{
                    background: 'none',
                    cursor: 'pointer',
                    border: 'none',
                  }}>
                  <img
                    className='avatar-profile'
                    src={`/api/user/${user._id}/avatar`}
                    loading='lazy'
                    alt='avatar'
                  />
                </button>
              ) : (
                <img
                  className='avatar-profile'
                  src='/img/defaultProfile.jpg'
                  loading='lazy'
                  alt='avatar'
                />
              )}
            </div>
          </div>

          <div id='hide-sm' className='user-card__details'>
            {user._id}
          </div>
          <button
            onClick={(e) => setOpenAdmin(!openAdmin)}
            style={{
              background: 'none',
              cursor: 'pointer',
              border: 'none',
              fontSize: '1.4rem',
              fontFamily: 'Oswald, sans-serif',
              textTransform: 'uppercase',
            }}>
            <div className='user-card__details'>{user.name}</div>
          </button>
          <div className='user-card__details'>{user.email}</div>
          <div id='hide-sm' className='user-card__details'>
            {user.createdAt.slice(0, 10)}
          </div>
          <div id='hide-sm' className='user-card__details'>
            {user.loginCount}
          </div>
          <div>
            <button
              style={{ marginTop: '1rem' }}
              className='btn user-delete'
              onClick={(e) => handleDelete(user._id, 'account', user.name)}>
              <i className='fas fa-trash-alt' />
            </button>
          </div>
        </div>

        {openAdmin && (
          <Fragment>
            <div
              style={{
                marginLeft: '2rem',
                marginBottom: '1rem',
                maxWidth: '90%',
                borderBottom: '3px solid #ff0a0a',
                fontSize: '1.4rem',
              }}>
              <button
                className='btn'
                style={{ width: '100%' }}
                onClick={
                  user.isAdmin
                    ? (e) => handleAdmin(user._id, 'admin', user.name, 'remove')
                    : (e) => handleAdmin(user._id, 'admin', user.name, 'add')
                }>
                {user.isAdmin ? 'Remove Admin Access' : 'Add Admin Access'}
              </button>
            </div>
          </Fragment>
        )}
      </div>
      <Modal show={show} handleClose={handleClose} content={content} />
    </Fragment>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  adminDeleteUserAvatar: PropTypes.func.isRequired,
  adminDeleteUser: PropTypes.func.isRequired,
  adminEditAdmin: PropTypes.func.isRequired,
};

export default connect(null, {
  adminDeleteUserAvatar,
  adminDeleteUser,
  adminEditAdmin,
})(User);
