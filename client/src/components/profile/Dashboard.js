import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../Alert';
import Spinner from '../Spinner';
import ProfileActions from './ProfileActions';
import Profile from './Profile';
import { seenTrophy, getUserTrophies } from '../../actions/trophies';
import Modal from '../Modal';

const Dashboard = ({
	auth: { user, loading },
	trophy: { trophies, loading: trophyLoading },
	seenTrophy,
	getUserTrophies,
}) => {
	const handleDismiss = (id) => {
		seenTrophy(id);
	};
	useEffect(() => {
		getUserTrophies();
	}, []);
	return (
		<div>
			{!loading ? (
				<Fragment>
					<Alert />
					<div className='content-container'>
						<Fragment>
							<h1 style={{ marginBottom: '2rem' }}>
								<span className='red-span'>Welcome</span>{' '}
								<span className='low-weight-span'>{user.name}!</span>
							</h1>
						</Fragment>
						<ProfileActions />
						<Profile user={user} />
					</div>
					{!trophyLoading &&
						trophies.length > 0 &&
						trophies.map((trophy) => (
							<Modal
								key={trophy._id}
								show={true}
								handleDismiss={handleDismiss}
								content={{
									title: trophy.title,
									body: trophy.body,
									icon: trophy.icon,
									type: 'dismiss',
								}}
								idToDismiss={trophy.trophy}
							/>
						))}
				</Fragment>
			) : (
				<Spinner />
			)}
		</div>
	);
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	trophy: PropTypes.object.isRequired,
	seenTrophy: PropTypes.func.isRequired,
	getUserTrophies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	trophy: state.trophy,
});

export default connect(mapStateToProps, { seenTrophy, getUserTrophies })(
	withRouter(Dashboard)
);
