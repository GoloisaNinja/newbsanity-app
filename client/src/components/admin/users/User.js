import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminDeleteUserAvatar, adminDeleteUser } from '../../../actions/admin';
import Modal from '../../Modal';

const User = ({ user, adminDeleteUserAvatar, adminDeleteUser }) => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [content, setContent] = useState();
  const [deleteType, setDeleteType] = useState();

  const handleDelete = (id, type, name) => {
    setUserId(id);
    setDeleteType(type);
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

  const handleClose = (shouldDelete) => {
    setShow(false);
    if (shouldDelete && deleteType === 'avatar') {
      adminDeleteUserAvatar(userId);
    } else if (shouldDelete && deleteType === 'account') {
      adminDeleteUser(userId);
    }
  };
  return (
    <Fragment>
      <div className='user-card-container'>
        <div className='user-card__avatar' key={user._id}>
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
        <div id='hide-sm' className='user-card__details'>
          {user._id}
        </div>
        <div className='user-card__details'>{user.name}</div>
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
      <Modal show={show} handleClose={handleClose} content={content} />
    </Fragment>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  adminDeleteUserAvatar: PropTypes.func.isRequired,
  adminDeleteUser: PropTypes.func.isRequired,
};

export default connect(null, { adminDeleteUserAvatar, adminDeleteUser })(User);
