import React from 'react';

const ProfileOrderHistory = () => {
	return (
		<div className='profile-order-container'>
			<div className='profile-avatar'>
				<h2>
					Recent
					<span style={{ color: '#ff0a0a' }}> Orders</span>
				</h2>
			</div>
			<div className='profile-bio' style={{ flex: 1 }}>
				<div className='profile-bio__header'>
					<h3>
						<span className='red-span' style={{ color: '#ff0a0a' }}>
							Your Order{' '}
						</span>{' '}
						<span className='low-weight-span'>Activity</span>
					</h3>
				</div>
				<p style={{ borderBottom: '3px solid #ff0a0a', marginBottom: '2rem' }}>
					Details of last order
				</p>

				<div>
					<h3>Looks like you don't have any orders yet...</h3>
					<p className='event-text'>
						You can always purchase Newbsanity branded clothing and membership
						packages in our store.
					</p>
				</div>

				<button
					disabled
					style={{ marginTop: '2rem', width: '100%' }}
					className='btn'>
					All orders
				</button>
			</div>
		</div>
	);
};

export default ProfileOrderHistory;
