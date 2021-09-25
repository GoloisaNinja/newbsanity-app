import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Event from '../components/Event';
import { getLandingEvents } from '../actions/events';
import Spinner from './Spinner';

const Landing = ({ loading, getLandingEvents, landingEvents }) => {
	useEffect(() => {
		getLandingEvents();
	}, [getLandingEvents]);
	return (
		<div className='content-container'>
			<div className='landing-intro'>
				<h1 style={{ marginBottom: '1rem' }}>
					<span className='red-span'>Welcome</span>{' '}
					<span className='low-weight-span'>to Newbsanity</span>
				</h1>
				<p style={{ marginBottom: '1rem' }}>
					Newbsanity is the premier fitness experience in the northeast. Check
					out our events, obstacles and workout plans/pricing. Sign in to log
					workouts, chat in the forums and get exclusive member benefits.
				</p>
			</div>
			<h3>
				<span className='red-span'>Upcoming</span>{' '}
				<span className='low-weight-span'>Events</span>
				<span style={{ fontSize: '1rem' }}></span>
			</h3>
			<Fragment>
				{!loading && landingEvents.length > 0 ? (
					<Event events={landingEvents} />
				) : (
					<Spinner />
				)}
			</Fragment>
			{/* for upcoming feature page that lists full year of events */}
			{/* <Link to='/'>
				<button className='btn btn-red'>
					Full <span className='low-weight-span'>event listing</span>
				</button>
			</Link> */}
			<h3>
				<span className='red-span'>Thank you</span>{' '}
				<span className='low-weight-span'>to our local sponsors!</span>
			</h3>
			<div className='landing-sponsors'>
				<a href='https://www.folandlumber.com/'>
					<img
						className='landing-sponsors__img'
						src='./img/1.png'
						alt='foland lumber'
					/>
				</a>

				<a href='https://pullanopt.com/'>
					<img
						className='landing-sponsors__img'
						src='./img/2.png'
						alt='pullano pt'
					/>
				</a>

				<a href='/'>
					<img
						className='landing-sponsors__img'
						src='./img/3.png'
						alt='z2 construction'
					/>
				</a>
			</div>
		</div>
	);
};

Landing.propTypes = {
	getLandingEvents: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	landingEvents: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	loading: state.events.loading,
	landingEvents: state.events.events,
});

export default connect(mapStateToProps, { getLandingEvents })(Landing);
