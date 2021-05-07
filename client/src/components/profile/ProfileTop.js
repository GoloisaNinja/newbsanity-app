import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileTop = ({ auth: { user }, profile: { profile } }) => {
	return (
		<div className='profile-container'>
			<div className='profile-avatar'>
				{user.avatar ? (
					<Fragment>
						<div className='avatar-container' style={{ position: 'relative' }}>
							<img
								className='post-avatar-profile'
								src={`/api/user/${user._id}/avatar`}
								loading='lazy'
								alt='avatar'
							/>
							<div
								className='img-overlay'
								style={{
									borderRadius: '50%',
									height: '150px',
									width: '150px',
									marginTop: '1.5rem',
								}}>
								<div className='text-overlay'>
									<Link to='/avatar'>
										<h6
											style={{ padding: '0 2rem', color: '#fff' }}
											className='event-title'>
											<i
												style={{
													marginBottom: '.4rem',
													color: '#fff',
													fontSize: '4rem',
												}}
												className='fas fa-user-ninja'
											/>{' '}
											edit<span className='low-weight-span'>avatar</span>
										</h6>
									</Link>
								</div>
							</div>
						</div>
					</Fragment>
				) : (
					<Fragment>
						<div className='avatar-container' style={{ position: 'relative' }}>
							<img
								className='post-avatar-profile'
								src='/img/defaultProfile.jpg'
								loading='lazy'
								alt='avatar'
							/>
							<div
								className='img-overlay'
								style={{
									borderRadius: '50%',
									height: '150px',
									width: '150px',
									marginTop: '1.5rem',
								}}>
								<div className='text-overlay'>
									<Link to='/avatar'>
										<h6
											style={{ padding: '0 2rem', color: '#fff' }}
											className='event-title'>
											<i
												style={{
													marginBottom: '.4rem',
													color: '#fff',
													fontSize: '4rem',
												}}
												className='fas fa-user-ninja'
											/>{' '}
											edit<span className='low-weight-span'>avatar</span>
										</h6>
									</Link>
								</div>
							</div>
						</div>
					</Fragment>
				)}
				{profile !== null && (
					<div className='profile-social-icons'>
						{profile.personalwebsite && (
							<a href={profile.personalwebsite}>
								<i className='fas fa-globe' id='prof-icons' />
							</a>
						)}
						{profile.social && profile.social.facebook && (
							<a href={profile.social.facebook}>
								<i className='fab fa-facebook' id='prof-icons' />
							</a>
						)}
						{profile.social && profile.social.instagram && (
							<a href={profile.social.instagram}>
								<i className='fab fa-instagram-square' id='prof-icons' />
							</a>
						)}
						{profile.social && profile.social.twitter && (
							<a href={profile.social.twitter}>
								<i className='fab fa-twitter' id='prof-icons' />
							</a>
						)}
						{profile.social && profile.social.reddit && (
							<a href={profile.social.reddit}>
								<i className='fab fa-reddit-alien' id='prof-icons' />
							</a>
						)}
						{profile.social && profile.social.linkedin && (
							<a href={profile.social.linkedin}>
								<i className='fab fa-linkedin-in' id='prof-icons' />
							</a>
						)}
						{profile.social && profile.social.youtube && (
							<a href={profile.social.youtube}>
								<i className='fab fa-youtube' id='prof-icons' />
							</a>
						)}
					</div>
				)}
			</div>
			{profile === null ? (
				<div className='profile-bio' style={{ flex: 1 }}>
					<div className='profile-bio__header'>
						<h3>
							<span className='red-span' style={{ color: '#ff0a0a' }}>
								Newbsanity{' '}
							</span>{' '}
							<span className='low-weight-span'>Profile</span>
						</h3>
					</div>
					<p style={{ borderBottom: '3px solid #ff0a0a' }}>
						Wow such empties...
					</p>

					<div className='profile-events'>
						<h3 className='event-title'>
							Looks{' '}
							<span className='low-weight-span'>
								like you don't have a profile...
							</span>
						</h3>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div style={{ flex: 1 }}>
								<p className='event-text'>
									You should make one! A profile allows you to log workouts and
									register for events and win meaningless trophies!
								</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='profile-bio'>
					<div className='profile-bio__header'>
						<h3>
							<span className='red-span' style={{ color: '#ff0a0a' }}>
								Newbsanity{' '}
							</span>{' '}
							<span className='low-weight-span'>Profile</span>
						</h3>
					</div>
					<p style={{ borderBottom: '3px solid #ff0a0a' }}>Personal</p>
					<ul
						style={{
							fontWeight: 300,
							fontSize: '1.2rem',
							paddingTop: '1rem',
							paddingBottom: '1rem',
						}}>
						<li>
							<span className='personal-item-span'>bio: </span>
							{profile.bio ? profile.bio : 'no bio yet'}
						</li>
						<li>
							<span className='personal-item-span'>age: </span>
							{profile.age}
						</li>
						<li>
							<span className='personal-item-span'>gender: </span>
							{profile.gender ? profile.gender : ''}
						</li>
						<li>
							<span className='personal-item-span'>location: </span>
							{profile.location ? profile.location : 'no location yet'}
						</li>
						<li>
							<span className='personal-item-span'>career field: </span>
							{profile.careerfield
								? profile.careerfield
								: 'no career field yet'}
						</li>
						<li>
							<span className='personal-item-span'>fitness lvl: </span>
							{profile.currentfitnesslevel
								? profile.currentfitnesslevel
								: 'no fitness level yet'}
						</li>
						<li>
							<span className='personal-item-span'>goal fitness lvl: </span>
							{profile.goalfitnesslevel
								? profile.goalfitnesslevel
								: 'no goal fitness level yet'}
						</li>
					</ul>
					<p style={{ borderBottom: '3px solid #ff0a0a' }}>Likes</p>
					<div className='profile-hobbies'>
						{profile.hobbies && profile.hobbies.length > 0 ? (
							profile.hobbies.map((hobby) => (
								<p className='profile-hobbies__item' key={hobby}>
									{' '}
									<i id='hobby-icon' className='fas fa-check-square' />
									{hobby}
								</p>
							))
						) : (
							<p>
								No{' '}
								<span className='low-weight-span'>likes at the moment...</span>
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps)(ProfileTop);
