import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setAdminPostFilter,
  setAdminPostSearchBy,
} from '../../../actions/filters';

const PostsFilters = ({
  filters,
  setAdminPostFilter,
  setAdminPostSearchBy,
}) => {
  return (
    <div className='admin-user-filter-input'>
      <label className='profile-label'>Search For Post By</label>
      <select
        style={{ marginBottom: '1rem' }}
        value={filters.searchBy}
        className='form-input'
        name='postSearchBy'
        onChange={(e) => setAdminPostSearchBy(e.target.value)}>
        <option value='postText'>Post Text</option>
        <option value='postUser'>Post User</option>
      </select>
      <label className='profile-label'>Search for Post</label>
      <input
        style={{ marginBottom: '1rem' }}
        type='text'
        className='form-input'
        value={filters.text}
        onChange={(e) => {
          setAdminPostFilter(e.target.value);
        }}
      />
    </div>
  );
};

PostsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  setAdminPostFilter: PropTypes.func.isRequired,
  setAdminPostSearchBy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filters: state.filters.adminPost,
});

export default connect(mapStateToProps, {
  setAdminPostFilter,
  setAdminPostSearchBy,
})(PostsFilters);
