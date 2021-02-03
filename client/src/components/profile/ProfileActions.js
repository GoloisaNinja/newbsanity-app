import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileActions = ({ profile: { profile } }) => {
  return (
    <div className='profile-actions'>
      <Link to='/profile'>
        <button className='btn profile-action'>
          <i className='fas fa-id-badge' /> Create/edit Profile
        </button>
      </Link>
      <Link to='/events'>
        <button className='btn profile-action'>
          <i className='fas fa-calendar-alt' /> View/register Events
        </button>
      </Link>
      <Link to='/workouts'>
        <button className='btn profile-action' disabled={profile === null}>
          <i className='fas fa-dumbbell' /> Create workout
        </button>
      </Link>
    </div>
  );
};

ProfileActions.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ProfileActions);
