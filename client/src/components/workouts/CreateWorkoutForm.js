import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createWorkout } from '../../actions/workouts';
import Alert from '../Alert';

const CreateWorkoutForm = ({ createWorkout, user: { _id }, history }) => {
  const [formData, setFormData] = useState({
    extremeRavineLaps: 0,
    mudGauntletLaps: 0,
    workoutPartner: '',
    text: '',
    date: '',
  });

  const {
    extremeRavineLaps,
    mudGauntletLaps,
    workoutPartner,
    text,
    date,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createWorkout(formData);
    setFormData({
      extremeRavineLaps: 0,
      mudGauntletLaps: 0,
      workoutPartner: '',
      text: '',
      date: '',
    });
  };

  return (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div style={{ marginBottom: '2rem' }}>
          <Link to='/dashboard' className='btn profile-social'>
            Go Back to Dashboard
          </Link>
        </div>
        <div className='landing-intro'>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>Create/Edit</span>{' '}
            <span className='low-weight-span'>your workouts</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            As a part of the Newbsanity community, you have the express
            priviledge of logging specific workouts that help you qualify for
            amazing member benefits! The Newbsanity Century Club is an elite
            tier of atheletes that have completed one of the following:
          </p>
          <ul style={{ marginBottom: '1rem' }}>
            <li style={{ fontWeight: 300, fontSize: '1.2rem', color: '#fff' }}>
              50 laps of the Extreme Ravine and 50 laps of the Mud Gauntlet
            </li>
            <li style={{ fontWeight: 300, fontSize: '1.2rem', color: '#fff' }}>
              100 laps of Extreme Ravine
            </li>
            <li style={{ fontWeight: 300, fontSize: '1.2rem', color: '#fff' }}>
              100 laps of Mud Gauntlet
            </li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>
            The Century Club is the Valhalla of Newbsanity. Should you reach it,
            you shall forever be remembered as a glorious and unforgiving
            warrior of the purest mettle. Glory will follow you to coffee shops
            and farmer's markets for the rest of your days.
          </p>
        </div>

        <div className='form-container'>
          <form className='form-profile' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label className='profile-label' htmlFor='age'>
                Extreme Ravine Laps (if any)
              </label>
              <input
                className='form-input'
                type='number'
                id='extremeRavineLaps'
                name='extremeRavineLaps'
                value={extremeRavineLaps}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label className='profile-label' htmlFor='gender'>
                Mud Gauntlet Laps (if any)
              </label>
              <input
                className='form-input'
                type='number'
                id='mudGauntletLaps'
                name='mudGauntletLaps'
                value={mudGauntletLaps}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label className='profile-label' htmlFor='location'>
                Workout Partner Name (if any)
              </label>
              <input
                className='form-input'
                type='text'
                id='workoutPartner'
                name='workoutPartner'
                value={workoutPartner}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label className='profile-label' htmlFor='bio'>
                Workout Notes/Trash Talk
              </label>
              <textarea
                className='form-input'
                placeholder='I bought this workout a cheap necklace and then crushed it, just like I did to your mom...'
                cols='30'
                rows='4'
                id='text'
                name='text'
                value={text}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label className='profile-label' htmlFor='location'>
                Date of Workout *required
              </label>
              <input
                className='form-input'
                type='date'
                min='2021-01-01'
                required
                id='date'
                name='date'
                value={date}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <input
                type='submit'
                className='btn profile-submit'
                value='Create Workout'
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

CreateWorkoutForm.propTypes = {
  createWorkout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { createWorkout })(
  withRouter(CreateWorkoutForm)
);
