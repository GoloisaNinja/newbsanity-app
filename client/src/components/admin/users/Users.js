import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisibleUsers from '../../../selectors/adminUsers';
import User from './User';

const Users = ({ users, filteredUsers }) => {
  return (
    users &&
    users.length > 0 &&
    filteredUsers.map((user) => <User key={user._id} user={user} />)
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.admin.users.users,
  filteredUsers: getVisibleUsers(
    state.admin.users.users,
    state.filters.adminUser
  ),
});

export default connect(mapStateToProps)(Users);
