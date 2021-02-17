import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTrophyCase = ({ profile }) => {
  let trophy = null;
  if (profile !== null && profile.trophies.length > 0) {
    trophy = profile.trophies[0];
  }

  return (
    <div className='profile-trophy-container'>
      <div className='profile-avatar'>
        <h2>
          Trophy
          <span style={{ color: '#ff0a0a' }}> Case</span>
        </h2>
      </div>
      <div className='profile-bio' style={{ flex: 1 }}>
        <div className='profile-bio__header'>
          <h3>
            <span className='red-span' style={{ color: '#ff0a0a' }}>
              Your Reward{' '}
            </span>{' '}
            <span className='low-weight-span'>Center</span>
          </h3>
        </div>
        <p style={{ borderBottom: '3px solid #ff0a0a', marginBottom: '2rem' }}>
          Last Trophy Acquired
        </p>
        {trophy !== null ? (
          <div className='trophy-card-container'>
            <img className='trophy-icon' src={trophy.icon} alt={trophy.title} />

            <h3>{trophy.title}</h3>

            <p className='event-text'>{trophy.body}</p>
          </div>
        ) : (
          <div>
            <h3>Looks like you don't have any trophies yet...</h3>
            <p className='event-text'>
              Use the app more so that we can reward with meaningless
              gratification...
            </p>
          </div>
        )}

        <Link to='/dashboard'>
          <button style={{ marginTop: '2rem', width: '100%' }} className='btn'>
            All Trophies
          </button>
        </Link>
      </div>
    </div>
  );
};

ProfileTrophyCase.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTrophyCase;
