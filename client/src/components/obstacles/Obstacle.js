import React, { Fragment } from 'react';
import obstacleArray from './ObstacleArray';

const Obstacle = () => {
  return (
    <Fragment>
      {obstacleArray.map((obstacle) => (
        <div className='obstacle-container' key={obstacle.key}>
          <div className='obstacle-container-img'>
            <img
              style={{ height: '100%' }}
              src={obstacle.src}
              alt={`Newbsanity people near obstacle named ${obstacle.name1} ${obstacle.name2}`}
            />
            <div className='img-overlay'>
              <div className='text-overlay'>
                <h2 style={{ padding: '0 2rem' }} className='event-title'>
                  {obstacle.name1}{' '}
                  <span className='low-weight-span'>{obstacle.name2}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className='obstacle-container-description'>
            <p className='event-text'>{obstacle.description}</p>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default Obstacle;
