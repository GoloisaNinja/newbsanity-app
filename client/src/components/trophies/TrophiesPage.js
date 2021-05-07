import React, { Fragment, useEffect, useState } from 'react';
import TrophyCard from './TrophyCard';
import Spinner from '../Spinner';
import Alert from '../Alert';
import axios from 'axios';

const TrophiesPage = () => {
	const [trophies, setTrophies] = useState([]);
	useEffect(() => {
		const getTrophies = async () => {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			try {
				const res = await axios.get(`/api/trophies/all`, config);
				if (res.status === 200) {
					setTrophies(res.data);
				}
			} catch (e) {
				console.log(e.message);
			}
		};
		getTrophies();
	}, [setTrophies]);
	return (
		<Fragment>
			{trophies.length < 0 ? (
				<Spinner />
			) : (
				<Fragment>
					<Alert />
					<div className='content-container'>
						<div className='landing-intro'>
							<h1 style={{ marginBottom: '1rem' }}>
								<span className='red-span'>Newbsanity</span>{' '}
								<span className='low-weight-span'>Trophies and Awards</span>
							</h1>
							<p style={{ marginBottom: '1rem' }}>
								Behold! The magical land of fake encouragement via the
								disbursment of entirely meaningless digital trophies! It is here
								that all your accomplishments, or lack there of, are evident!
								Don't even try acting like you don't care...
							</p>
						</div>
						<h3 style={{ marginBottom: '2rem' }}>
							<span className='red-span'>All</span>{' '}
							<span className='low-weight-span'>Trophies</span>
						</h3>
						<Fragment>
							<div className='event-grid-main'>
								{trophies.length > 0 ? (
									trophies.map((trophy) => (
										<TrophyCard key={trophy._id} trophy={trophy} />
									))
								) : (
									<p>No Trophies at this time...</p>
								)}
							</div>
						</Fragment>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default TrophiesPage;
