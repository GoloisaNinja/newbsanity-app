import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Spinner from '../Spinner';
import ProfileTop from './ProfileTop';
import ProfileEvents from './ProfileEvents';
import ProfileAdvice from './ProfileAdvice';
import ProfileRegisteredEvents from './ProfileRegisteredEvents';
import ProfileTrophyCase from './ProfileTrophyCase';
import ProfileOrderHistory from './ProfileOrderHistory';
import ProfileWorkouts from './ProfileWorkouts';
import { assignTrophy } from '../../actions/trophies';

const Profile = ({
	user,
	getProfile,
	profile: { loading, profile },
	assignTrophy,
}) => {
	useEffect(() => {
		if (user.loginCount === 10) {
			assignTrophy('601d2694d9db960017439143');
		}
		getProfile(user._id);
	}, [getProfile, user._id, user.loginCount, assignTrophy]);

	return !loading ? (
		<Fragment>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='profile-main-grid'>
					<ProfileTop />
					<ProfileAdvice />
					<ProfileRegisteredEvents />
					<ProfileTrophyCase profile={profile} />
					<ProfileOrderHistory />
				</div>
				<ProfileEvents />
				<ProfileWorkouts />
			</div>
		</Fragment>
	) : (
		<Spinner />
	);
};

Profile.propTypes = {
	getProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	assignTrophy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, {
	getProfile,
	assignTrophy,
})(Profile);
