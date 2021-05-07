import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TrophyCard = ({ trophy, profile }) => {
	let hasTrophy = [];
	if (profile !== null) {
		hasTrophy = profile.trophies.filter(
			(profTrophy) => profTrophy.trophy === trophy._id
		);
	}

	return (
		<div
			className={
				hasTrophy.length === 0
					? 'trophy-card-container disabled'
					: 'trophy-card-container'
			}>
			<img className='trophy-icon' src={trophy.icon} alt={trophy.title} />

			<h3>{trophy.title}</h3>

			<p className='event-text'>{trophy.body}</p>
		</div>
	);
};

TrophyCard.propTypes = {
	profile: PropTypes.object.isRequired,
	trophy: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
});

export default connect(mapStateToProps)(TrophyCard);
