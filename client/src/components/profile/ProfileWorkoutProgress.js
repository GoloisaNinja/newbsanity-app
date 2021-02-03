import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileWorkoutProgress = ({ profile: { profile } }) => {
  return (
    <Fragment>
      <div className='workout-progress-container'>
        <div style={{ marginBottom: '1.2rem', marginTop: '1rem' }}>
          <div>
            <label style={{ fontSize: '1.2rem' }}>
              <i className='fas fa-trophy' /> Century Club{' '}
            </label>{' '}
          </div>
          <div>
            <progress
              className='workout-progress'
              min='0'
              max='100'
              value={
                profile === null
                  ? 0
                  : profile.centuryClub.ravineClubTotal +
                    profile.centuryClub.gauntletClubTotal
              }></progress>{' '}
            <span
              id='hide-sm'
              style={{ fontSize: '1.2rem', textAlign: 'left' }}>
              {profile === null
                ? 0
                : profile.centuryClub.ravineClubTotal +
                  profile.centuryClub.gauntletClubTotal}
              {''} %
            </span>
          </div>
        </div>
        <div style={{ marginBottom: '1.2rem' }}>
          <div>
            <label style={{ fontSize: '1.2rem', textAlign: 'left' }}>
              <i className='fas fa-mountain' /> Extreme Ravine{' '}
            </label>{' '}
          </div>
          <div>
            <progress
              className='workout-progress'
              min='0'
              max='100'
              value={
                profile === null ? 0 : profile.centuryClub.ravineTotal
              }></progress>{' '}
            <span
              id='hide-sm'
              style={{ fontSize: '1.2rem', textAlign: 'left' }}>
              {profile === null ? 0 : profile.centuryClub.ravineTotal}
              {''} %
            </span>
          </div>
        </div>
        <div style={{ marginBottom: '1.2rem' }}>
          <div>
            <label style={{ fontSize: '1.2rem' }}>
              <i className='fas fa-running' /> Mud Gauntlet{' '}
            </label>{' '}
          </div>
          <div className='workout-progress-container-progress'>
            <progress
              className='workout-progress'
              min='0'
              max='100'
              value={
                profile === null ? 0 : profile.centuryClub.gauntletTotal
              }></progress>{' '}
            <span
              id='hide-sm'
              style={{ fontSize: '1.2rem', textAlign: 'left' }}>
              {profile === null ? 0 : profile.centuryClub.gauntletTotal}
              {''} %
            </span>
          </div>
        </div>
        <Link to='/centuryclub'>
          <button className='btn club-standings'>
            <i className='fas fa-chart-line' /> Century Club Standings
          </button>
        </Link>
      </div>
    </Fragment>
  );
};

ProfileWorkoutProgress.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ProfileWorkoutProgress);
