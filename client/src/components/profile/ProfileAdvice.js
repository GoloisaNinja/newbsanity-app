import React, { useState, useEffect } from 'react';

const ProfileAdvice = () => {
  const jarrettAdvice = [
    {
      theme: 'inspiration',
      advice: `If you think you aren't good enough. You are right. You are trash. 50 extreme ravine laps trash person! Go!`,
    },
    {
      theme: 'self-healing',
      advice: `Healing is for the weak. If you want to self heal yourself's inner self. Stop sucking so much.`,
    },
    {
      theme: 'camaraderie',
      advice: `Having a running/workout partner is fun. It gives you someone to dominate and gloat to endless about how you are so much better than they are.`,
    },
    {
      theme: 'etsy adventure',
      advice: `I want you to buy the weirdest thing you can find on Etsy. Bring it to the next event or workout. Winner of weirdest items does 1000 pull-ups!`,
    },
    {
      theme: 'The Essence of Wetness',
      advice: `Water is the essence of wetness. Newbsanity strongly supports water during all our workouts. Not for drinking, but for jumping in. The colder the better.`,
    },
    {
      theme: 'Deep thoughts',
      advice: `Are clouds solid enough to run on? Could Newbsanity have obstacles in the sky? Is it possible to taste danger?`,
    },
  ];

  const [advice, setAdvice] = useState({});

  useEffect(() => {
    const advicePick =
      jarrettAdvice[Math.floor(Math.random() * jarrettAdvice.length)];
    setAdvice(advicePick);
  }, [setAdvice]);

  return (
    <div className='profile-advice-container'>
      <div className='profile-avatar'>
        <h2>
          Jarrett's
          <span style={{ color: '#ff0a0a' }}> Corner</span>
        </h2>
      </div>
      <div className='profile-bio' style={{ flex: 1 }}>
        <div className='profile-bio__header'>
          <h3>
            <span className='red-span' style={{ color: '#ff0a0a' }}>
              Your Daily{' '}
            </span>{' '}
            <span className='low-weight-span'>Advice</span>
          </h3>
        </div>
        <p style={{ borderBottom: '3px solid #ff0a0a' }}>
          Channel your inner Jarrett
        </p>

        <div className='profile-events'>
          <h3 className='event-title'>
            Today's Theme:{' '}
            <span className='low-weight-span'>{advice.theme}</span>
          </h3>
          <p className='event-text'>
            <i className='fas fa-quote-left' /> {advice.advice}{' '}
            <i className='fas fa-quote-right' />
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <div>
              <img
                className='advice-img'
                src='/img/jar1.jpg'
                alt='jarrett looking judgey'
              />{' '}
            </div>
            <div>
              <h5 style={{ textAlign: 'right', paddingRight: '2rem' }}>
                <span style={{ fontStyle: 'italic' }}>
                  {' '}
                  - Jarrett <span className='low-weight-span'>Newby 2021</span>
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdvice;
