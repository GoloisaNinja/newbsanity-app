import React, { Fragment } from 'react';

const Pricing = () => {
	const pricingDetailsArr = [
		{
			id: `p0`,
			price: 210,
			packageNameFirst: 'TOTAL',
			packageNameRest: 'WORKOUT PASS',
			packageDetails: `Includes entry to all group workouts, including winter training
      sessions, Wednesday Night Workouts, and open course days. Still
      decent amounts of glory.`,
		},
		{
			id: 'p1',
			price: 135,
			packageNameFirst: 'WEEKLY',
			packageNameRest: 'WORKOUT PASS',
			packageDetails: `Includes entry to all Wednesday Night Workout sessions.
      Wednesday Night Workout pass holders will also receive a 50%
      discount on open course day passes. Glory...diminishing....`,
		},
		{
			id: 'p2',
			price: 80,
			packageNameFirst: '10',
			packageNameRest: 'WORKOUT BUNDLE',
			packageDetails: `Includes entry to 10 Wednesday Night Workout sessions or other
      group fitness sessions. No shirt! Minimal Glory! I beg you to
      think of the shirt and the glory.`,
		},
		{
			id: 'p3',
			price: 75,
			packageNameFirst: 'EXTREME',
			packageNameRest: 'RAVINE PASS',
			packageDetails: `This pass is good for unlimited laps on the Extreme Ravine. Does
      not include entry into Newbsanity trail races. Limited use
      during October and November (Hunting *Wabbit Season). Nothing
      hurts your split time like a gunshot wound.`,
		},
		{
			id: 'p4',
			price: 50,
			packageNameFirst: 'WORST',
			packageNameRest: 'BIRTHDAY EVER!',
			packageDetails: `Guaranteed to be the best gift you ever give and the worst gift
      ever received. Plus. Pancakes. Ohhh the pancakes... Free for you
      and your group if you are a Newbsanity All-In pass holder. $50
      deposit per person for non-pass holders, to be refunded if you
      complete the event.`,
		},
	];
	return (
		<Fragment>
			<div className='content-container'>
				<div className='landing-intro'>
					<h1 style={{ marginBottom: '1rem' }}>
						<span className='red-span'>Pricing</span>{' '}
						<span className='low-weight-span'>Packages and Workouts</span>
					</h1>
					<p style={{ marginBottom: '1rem' }}>
						Whether it's creating an extreme corporate event or crafting the
						absolute <span className='red-span'>Worst Birthday Ever </span>
						<i style={{ fontSize: '.3rem' }} className='fas fa-trademark' />,
						Newbsanity will work with you to deliver a unique and
						awesome/terrible experience that you will talk about and possibly
						have nightmares about for years to come. Newbsanity is commited to
						creating custom events that are tailored to your/your groups
						specific skill and ability levels.
					</p>
				</div>
				<div className='pricing-grid'>
					<div className='pricing-container'>
						<div className='pricing-container-price'>
							<div
								style={{
									display: 'flex',
									position: 'absolute',
									paddingTop: '1rem',
								}}>
								<img
									style={{
										width: '25px',
										marginRight: '.5rem',
										position: 'absolute',
										top: '5px',
										left: '-25px',
									}}
									src='/img/smallrocket2.png'
									alt='rocket'
								/>{' '}
								<p style={{ fontSize: '1rem' }}> best value</p>
							</div>
							<h1
								style={{
									fontSize: '8rem',
									textAlign: 'center',
									fontWeight: 300,
								}}>
								<span style={{ fontSize: '2rem' }}>$ </span>
								325<span style={{ fontSize: '1rem' }}> usd</span>
							</h1>
						</div>
						<div className='pricing-container-description'>
							<h3 style={{ padding: '0 2rem' }} className='event-title'>
								Newbsanity <span className='low-weight-span'>All-in</span>
							</h3>
							<p className='event-text'>
								Includes all events, all Wednesday Night Workout sessions, open
								course sessions, 3 Wednesday Night Workout guest passes, and an
								exclusive #seeing
								<span style={{ fontWeight: 700 }} className='red-span'>
									red
								</span>{' '}
								Newbsanity t-shirt. And Glory. OMG the glory.
							</p>
						</div>
					</div>
					{pricingDetailsArr.map((option) => (
						<div className='pricing-container' key={option.id}>
							<div className='pricing-container-price'>
								<h1
									style={{
										fontSize: '8rem',
										textAlign: 'center',
										fontWeight: 300,
									}}>
									<span style={{ fontSize: '2rem' }}>$ </span>
									{option.price}
									<span style={{ fontSize: '1rem' }}> usd</span>
								</h1>
							</div>
							<div className='pricing-container-description'>
								<h3 style={{ padding: '0 2rem' }} className='event-title'>
									{option.packageNameFirst}{' '}
									<span className='low-weight-span'>
										{option.packageNameRest}
									</span>
								</h3>
								<p className='event-text'>{option.packageDetails}</p>
							</div>
						</div>
					))}
				</div>
				<h3>
					<span className='red-span'>Additional</span>{' '}
					<span className='low-weight-span'>Offerings</span>
				</h3>
				<div className='pricing-container-offerings'>
					<p style={{ borderBottom: '3px solid #ff0a0a' }}>Workout Sessions</p>
					<ul
						style={{
							fontWeight: 300,
							fontSize: '1.2rem',
							paddingTop: '1rem',
							paddingBottom: '1rem',
						}}>
						<li>Single Session - $12</li>
						<li>Open Course Day Pass - $20</li>
					</ul>
				</div>
				<div className='pricing-container-offerings'>
					<p style={{ borderBottom: '3px solid #ff0a0a' }}>
						Private Events - corporate, birthday, etc
					</p>
					<ul
						style={{
							fontWeight: 300,
							fontSize: '1.2rem',
							paddingTop: '1rem',
							paddingBottom: '1rem',
						}}>
						<li>$20 per participating person - $300 group minimum</li>
						<li>Optional $100 for large tent setup</li>
					</ul>
				</div>
			</div>
		</Fragment>
	);
};

export default Pricing;
