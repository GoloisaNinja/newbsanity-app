import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ProfileWorkoutProgress = ({ workouts }) => {
  const [progression, setProgression] = useState({
    extremeRavine: 0,
    mudGauntlet: 0,
  });
  const { extremeRavine, mudGauntlet } = progression;

  const calcProgression = () => {
    let ravlaps = 0;
    let mudlaps = 0;
    workouts.forEach((workout) => {
      ravlaps = ravlaps + workout.extremeRavineLaps;
      mudlaps = mudlaps + workout.mudGauntletLaps;
    });
    setProgression({
      extremeRavine: ravlaps,
      mudGauntlet: mudlaps,
    });
  };

  useEffect(() => {
    calcProgression();
  }, [workouts]);

  return (
    <Fragment>
      <div className='workout-progress-container'>
        <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
          <label style={{ fontSize: '1.2rem' }}>
            <i className='fas fa-trophy' /> Century Club Progress{' '}
          </label>{' '}
          <progress
            className='workout-progress'
            min='0'
            max='100'
            value={mudGauntlet + extremeRavine}></progress>{' '}
          <span style={{ fontSize: '1.2rem', textAlign: 'left' }}>
            {mudGauntlet + extremeRavine}
            {''} %
          </span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.2rem', textAlign: 'left' }}>
            <i className='fas fa-mountain' /> Extreme Ravine Progress{' '}
          </label>{' '}
          <progress
            className='workout-progress'
            min='0'
            max='100'
            value={extremeRavine}></progress>{' '}
          <span style={{ fontSize: '1.2rem', textAlign: 'left' }}>
            {extremeRavine}
            {''} %
          </span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.2rem' }}>
            <i className='fas fa-running' /> Mud Gauntlet Progress{' '}
          </label>{' '}
          <progress
            className='workout-progress'
            min='0'
            max='100'
            value={mudGauntlet}></progress>{' '}
          <span style={{ fontSize: '1.2rem', textAlign: 'left' }}>
            {mudGauntlet}
            {''} %
          </span>
        </div>
      </div>
    </Fragment>
  );
};

ProfileWorkoutProgress.propTypes = {
  workouts: PropTypes.array.isRequired,
};

export default ProfileWorkoutProgress;
