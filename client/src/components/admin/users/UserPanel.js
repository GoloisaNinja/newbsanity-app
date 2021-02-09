import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminDeleteUserAvatar } from '../../../actions/admin';
import Modal from '../../Modal';
import Alert from '../../Alert';

const UserPanel = ({ users, adminDeleteUserAvatar }) => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [content, setContent] = useState();

  const handleDelete = (id, type) => {
    setUserId(id);
    if (type === 'avatar') {
      setContent({
        title: 'Delete User Avatar?',
        body: `Are you sure you want to delete this user's avatar?`,
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
    if (shouldDelete) {
      adminDeleteUserAvatar(userId);
    }
  };

  const userEntries = users.map((user) => (
    <tr key={user._id}>
      {user.avatar ? (
        <td>
          <button
            onClick={(e) => handleDelete(user._id, 'avatar')}
            style={{ background: 'none', cursor: 'pointer', border: 'none' }}>
            <img
              className='avatar-profile'
              src={`/api/user/${user._id}/avatar`}
              loading='lazy'
            />
          </button>
        </td>
      ) : (
        <td>
          <img
            className='avatar-profile'
            src='/img/defaultProfile.jpg'
            loading='lazy'
          />
        </td>
      )}
      <td id='hide-sm' style={{ textAlign: 'center' }}>
        {user._id}
      </td>
      <td style={{ textAlign: 'center' }}>{user.name}</td>
      <td style={{ textAlign: 'center' }}>{user.email}</td>
      <td id='hide-sm' style={{ textAlign: 'center' }}>
        {user.createdAt.slice(0, 10)}
      </td>
      <td style={{ textAlign: 'center' }} id='hide-sm'>
        {user.loginCount}
      </td>
      <td>
        <button
          className='btn workout-delete'
          onClick={(e) => handleDelete(workout._id)}>
          <i className='fas fa-trash-alt' />
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div className='landing-intro'>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>User</span>{' '}
            <span className='low-weight-span'> Admin Panel</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Use this panel to manage Newbsaniacs. See below for available Admin
            Actions.
          </p>
        </div>
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>All </span>{' '}
          <span className='low-weight-span'>Users</span>
        </h3>
        <div className='user-panel-users'>
          {users.length > 0 ? (
            <Fragment>
              <table className='user-table'>
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th id='hide-sm' style={{ textAlign: 'center' }}>
                      Id
                    </th>
                    <th style={{ textAlign: 'center' }}>Name</th>
                    <th style={{ textAlign: 'center' }}>Email</th>
                    <th id='hide-sm' style={{ textAlign: 'center' }}>
                      Joined App
                    </th>

                    <th id='hide-sm' style={{ textAlign: 'center' }}>
                      Logins
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{userEntries}</tbody>
              </table>
            </Fragment>
          ) : (
            <p>No users currently...</p>
          )}
        </div>
      </div>
      <Modal show={show} handleClose={handleClose} content={content} />
    </Fragment>
  );
};

UserPanel.propTypes = {
  users: PropTypes.array.isRequired,
  adminDeleteUserAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.admin.users,
});

export default connect(mapStateToProps, { adminDeleteUserAvatar })(UserPanel);
