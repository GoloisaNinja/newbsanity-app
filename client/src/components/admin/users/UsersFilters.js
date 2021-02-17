import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAdminUserTextFilter } from '../../../actions/filters';

const UsersFilters = ({ filters, setAdminUserTextFilter }) => {
  return (
    <div className='admin-user-filter-input'>
      <label className='profile-label'>Search for User</label>
      <input
        style={{ marginBottom: '1rem' }}
        type='text'
        className='form-input'
        value={filters.text}
        onChange={(e) => {
          setAdminUserTextFilter(e.target.value);
        }}
      />
    </div>
  );
};

UsersFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  setAdminUserTextFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filters: state.filters.adminUser,
});

export default connect(mapStateToProps, { setAdminUserTextFilter })(
  UsersFilters
);
