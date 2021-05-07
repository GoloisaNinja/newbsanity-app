import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteEventComment } from '../../actions/events';

const EventCommentItem = ({
	deleteEventComment,
	comment,
	eventId,
	auth: { user },
}) => {
	const [avatar, hasAvatar] = useState(false);

	useEffect(() => {
		const checkAvatar = async () => {
			try {
				const res = await axios.get(`/api/user/${comment.user}/avatar`);
				if (res.status === 200) {
					hasAvatar(true);
				}
			} catch (e) {
				console.log(e.message);
			}
		};
		checkAvatar();
	}, [hasAvatar, comment.user]);

	return (
		<Fragment>
			<div className='post-container'>
				<div className='post-user-container'>
					{avatar ? (
						<img
							className='post-avatar'
							loading='lazy'
							src={`/api/user/${comment.user}/avatar`}
							alt='avatar'
						/>
					) : (
						<img
							className='post-avatar'
							src='/img/defaultProfile.jpg'
							loading='lazy'
							alt='avatar'
						/>
					)}

					<h5 className='post-user'>{comment.name}</h5>
				</div>
				<div className='post-text-container'>
					<p className='post-text'>{comment.text}</p>
					<p className='post-date'>posted: {comment.date.slice(0, 10)}</p>
					<div className='post-social-container'>
						{comment.user === user._id && (
							<button
								className='btn post-delete'
								onClick={(e) => deleteEventComment(eventId, comment._id)}>
								<i className='fas fa-times' />
							</button>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

EventCommentItem.propTypes = {
	auth: PropTypes.object.isRequired,
	deleteEventComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteEventComment })(
	EventCommentItem
);
