import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserWorkouts } from '../../actions/workouts';
import Spinner from '../Spinner';
import ProfileWorkoutProgress from './ProfileWorkoutProgress';

const ProfileWorkouts = ({
  getUserWorkouts,
  workouts: { loading, workouts },
}) => {
  useEffect(() => {
    getUserWorkouts();
  }, [getUserWorkouts]);

  const workoutEntries = workouts.map((workout) => (
    <tr key={workout._id}>
      <td>{workout.date.slice(0, 10)}</td>
      <td style={{ textAlign: 'center' }}>{workout.extremeRavineLaps}</td>
      <td style={{ textAlign: 'center' }}>{workout.mudGauntletLaps}</td>
      <td>{workout.workoutPartner}</td>
      <td style={{ maxWidth: '30rem' }} id='hide-sm'>
        {workout.text}
      </td>
      <td>
        <button className='btn workout-delete'>
          <i className='fas fa-trash-alt' />
        </button>
      </td>
    </tr>
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='profile-workouts-container'>
        <div className='profile-avatar'>
          <h2>
            Completed<span style={{ color: '#ff0a0a' }}> Workouts</span>
          </h2>
        </div>
        <div className='profile-workout-main'>
          <div className='profile-bio__header'>
            <h3>
              <span className='red-span' style={{ color: '#ff0a0a' }}>
                Newbsanity{' '}
              </span>{' '}
              <span className='low-weight-span'>Century Club</span>
            </h3>
            <ProfileWorkoutProgress workouts={workouts} />
          </div>
          <p style={{ borderBottom: '3px solid #ff0a0a' }}>
            workouts you have logged
          </p>
          {workouts.length > 0 ? (
            <Fragment>
              <table className='workout-table'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th style={{ textAlign: 'center' }}>Ravine Laps</th>
                    <th style={{ textAlign: 'center' }}>Gauntlet Laps</th>
                    <th style={{ textAlign: 'center' }}>Partner</th>
                    <th style={{ textAlign: 'center' }} id='hide-sm'>
                      Notes
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>{workoutEntries}</tbody>
              </table>
            </Fragment>
          ) : (
            <div className='profile-events'>
              <h3 className='event-title'>
                No{' '}
                <span className='low-weight-span'>
                  workouts recorded yet...
                </span>
              </h3>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '2.5rem',
                }}>
                <Link style={{ width: '100%' }} to='/workouts'>
                  <button style={{ width: '100%' }} className='btn'>
                    Create a Workout
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

ProfileWorkouts.propTypes = {
  getUserWorkouts: PropTypes.func.isRequired,
  workouts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  workouts: state.workouts,
});

export default connect(mapStateToProps, { getUserWorkouts })(ProfileWorkouts);
