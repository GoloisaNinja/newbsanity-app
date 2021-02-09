import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminGetAllUsers } from '../../actions/admin';
import Spinner from '../Spinner';
import * as dayjs from 'dayjs';

const AtAGlanceUsers = ({ admin: { loading, users }, adminGetAllUsers }) => {
  useEffect(() => {
    adminGetAllUsers();
  }, [adminGetAllUsers]);

  const thisMonth = dayjs().month();
  const prevMonth = dayjs().month(thisMonth - 1);

  let usersThisMonth = [];
  let usersLastMonth = [];

  users.forEach((user) => {
    const userDate = dayjs(user.createdAt).month();
    if (userDate === thisMonth) {
      usersThisMonth.push(user);
    } else if (userDate === prevMonth.$M) {
      usersLastMonth.push(user);
    }
  });

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        className='admin-glance-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <div
          style={{
            marginBottom: '1.5rem',
            textAlign: 'center',
            backgroundColor: '#cecece',
            width: '100%',
          }}>
          <h2 style={{ color: '#0e1013' }}>
            User <span style={{ color: '#ff0a0a' }}>Panel</span>
          </h2>
        </div>
        <div style={{ padding: '1rem', flex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <label>
              Total <span className='low-weight-span'>Users</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={users.length}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {users.length}
          </div>
          <div style={{ textAlign: 'center' }}>
            <label>
              Joined <span className='low-weight-span'>Last Month</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={usersLastMonth.length}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {usersLastMonth.length}
          </div>
          <div style={{ textAlign: 'center' }}>
            <label>
              Joined <span className='low-weight-span'>This Month</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={usersThisMonth.length}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {usersThisMonth.length}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AtAGlanceUsers.propTypes = {
  adminGetAllUsers: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { adminGetAllUsers })(AtAGlanceUsers);
