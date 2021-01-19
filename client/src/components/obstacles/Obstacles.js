import React, { Fragment } from 'react';
import Obstacle from './Obstacle';

const Obstacles = () => {
  return (
    <Fragment>
      <div className='content-container'>
        <div className='landing-intro'>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>Newbsanity</span>{' '}
            <span className='low-weight-span'>Obstacles and Rigs</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            The Newbsanity adventure center is home to some of the most advanced
            and physically challenging obstacles and rigs ever built. Custom
            designed and fabricated to deliver the most intense workouts
            imaginable, these obstacles redefine extreme.
          </p>
        </div>
        <div className='hero-container'>
          <img
            className='obstacle-dom'
            src='/img/obstacles/redRig.jpg'
            alt='dom pizza slice'
          />
          <div className='img-overlay'>
            <div className='text-overlay'>
              <h3
                style={{ padding: '0 2rem', color: 'white', fontSize: '3rem' }}
                className='event-title'>
                Newbsanity <span className='low-weight-span'>Grip Rig</span>
              </h3>
            </div>
          </div>
        </div>
        <div className='obstacle-grid'>
          <Obstacle />
        </div>
        <h3>
          <span className='red-span'>Fine</span>{' '}
          <span className='low-weight-span'>Print</span>
        </h3>
        <div className='pricing-container-offerings'>
          <p style={{ borderBottom: '3px solid #ff0a0a' }}>
            Newbsanity is not responsible for:
          </p>
          <ul
            style={{
              fontWeight: 300,
              fontSize: '1.2rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
            }}>
            <li>Lost Shoes</li>
            <li>Shark Attacks</li>
            <li>UFO abductions</li>
            <li>muddy car seats</li>
          </ul>
        </div>
        <div className='pricing-container-offerings'>
          <p style={{ borderBottom: '3px solid #ff0a0a' }}>
            Newbsanity is responsible for:
          </p>
          <ul
            style={{
              fontWeight: 300,
              fontSize: '1.2rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
            }}>
            <li>sore muscles</li>
            <li>mad gainz</li>
            <li>your feelings of fun-ness</li>
            <li>muddy car seats</li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Obstacles;
