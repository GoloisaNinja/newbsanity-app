import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminDeleteUserAvatar } from '../../../actions/admin';
import Modal from '../../Modal';

const User = ({ users, adminDeleteUserAvatar }) => {
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
        body: `Are you sure you want to delete this user's account?`,
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
    }
  };
  return (
    users &&
    users.length > 0 &&
    users.map((user) => (
      <Fragment>
        <div className='user-card-container'>
          <div className='user-card__avatar'>
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
              onClick={(e) => console.log('action needed')}>
              <i className='fas fa-trash-alt' />
            </button>
          </div>
        </div>
        <Modal show={show} handleClose={handleClose} content={content} />
      </Fragment>
    ))
  );
};

User.propTypes = {
  users: PropTypes.array.isRequired,
  adminDeleteUserAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.admin.users,
});

export default connect(mapStateToProps, { adminDeleteUserAvatar })(User);
