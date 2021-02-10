import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserWorkouts, deleteWorkout } from '../../actions/workouts';
import Spinner from '../Spinner';
import ProfileWorkoutProgress from './ProfileWorkoutProgress';
import { assignTrophy } from '../../actions/trophies';
import Modal from '../Modal';

const ProfileWorkouts = ({
  auth: { user },
  deleteWorkout,
  getUserWorkouts,
  assignTrophy,
  workouts: { loading, workouts },
  profile: { profile },
}) => {
  useEffect(() => {
    getUserWorkouts();
  }, [getUserWorkouts]);

  const [show, setShow] = useState(false);
  const [workoutId, setWorkoutId] = useState('');
  const [content, setContent] = useState();

  const handleDismiss = () => {
    setShow(false);
  };
  const handleDelete = (id) => {
    setWorkoutId(id);
    setContent({
      title: 'Delete Workout?',
      body: 'OMG, are you sure you want to delete this workout?',
      icon: '/img/ninja.png',
      type: 'decision',
    });
    setShow(true);
  };
  const handleClose = (shouldDelete) => {
    setShow(false);
    if (shouldDelete) {
      deleteWorkout(workoutId, user._id);
    }
  };

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
        <button
          className='btn workout-delete'
          onClick={(e) => handleDelete(workout._id)}>
          <i className='fas fa-trash-alt' />
        </button>
      </td>
    </tr>
  ));

  useEffect(() => {
    if (workouts.length === 1) {
      assignTrophy('601d179ead25af90297faa12');
    }
  }, [assignTrophy, workouts]);

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
            <ProfileWorkoutProgress />
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
              {profile === null ? (
                <h3 className='event-title'>
                  Create{' '}
                  <span className='low-weight-span'>
                    a profile to log workouts...
                  </span>
                </h3>
              ) : (
                <h3 className='event-title'>
                  No{' '}
                  <span className='low-weight-span'>
                    workouts recorded yet...
                  </span>
                </h3>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '2.5rem',
                }}>
                {profile === null ? (
                  <Link style={{ width: '100%' }} to='/profile'>
                    <button style={{ width: '100%' }} className='btn'>
                      Create a profile
                    </button>
                  </Link>
                ) : (
                  <Link style={{ width: '100%' }} to='/workouts'>
                    <button style={{ width: '100%' }} className='btn'>
                      Create a Workout
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
        <Modal
          show={show}
          handleClose={handleClose}
          handleDismiss={handleDismiss}
          content={content}
        />
      </div>
    </Fragment>
  );
};

ProfileWorkouts.propTypes = {
  assignTrophy: PropTypes.func,
  getUserWorkouts: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
  workouts: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  workouts: state.workouts,
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUserWorkouts,
  deleteWorkout,
  assignTrophy,
})(ProfileWorkouts);
