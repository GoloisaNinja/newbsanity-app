import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminGetAllWorkouts } from '../../actions/admin';
import Spinner from '../Spinner';

const AtAGlanceWorkouts = ({
  admin: { loading, workouts },
  adminGetAllWorkouts,
}) => {
  useEffect(() => {
    adminGetAllWorkouts();
  }, [adminGetAllWorkouts]);

  let extremeLaps = 0;
  let mudLaps = 0;

  workouts.forEach((workout) => {
    extremeLaps += workout.extremeRavineLaps;
    mudLaps += workout.mudGauntletLaps;
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
            Workouts <span style={{ color: '#ff0a0a' }}>Panel</span>
          </h2>
        </div>
        <div style={{ padding: '1rem', flex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <label>
              Total <span className='low-weight-span'>Workouts</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={workouts.length}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {workouts.length}
          </div>
          <div style={{ textAlign: 'center' }}>
            <label>
              Total <span className='low-weight-span'>Extreme Laps</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={extremeLaps}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {extremeLaps}
          </div>
          <div style={{ textAlign: 'center' }}>
            <label>
              Total <span className='low-weight-span'>Gauntlet Laps</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={mudLaps}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {mudLaps}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AtAGlanceWorkouts.propTypes = {
  adminGetAllWorkouts: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { adminGetAllWorkouts })(
  AtAGlanceWorkouts
);
