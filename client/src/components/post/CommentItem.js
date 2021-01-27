import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteComment } from '../../actions/posts';

const CommentItem = ({ deleteComment, comment, postId, auth: { user } }) => {
  const [avatar, hasAvatar] = useState(false);
  useEffect(() => {
    checkAvatar();
  }, [comment]);

  const checkAvatar = async () => {
    try {
      const res = await axios.get(`/api/user/${comment.user}/avatar`);
      if (res.status === 200) {
        hasAvatar(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Fragment>
      <div className='post-container'>
        <div className='post-user-container'>
          {avatar ? (
            <img
              className='post-avatar'
              src={`/api/user/${comment.user}/avatar`}
              loading='lazy'
            />
          ) : (
            <img
              className='post-avatar'
              src='/img/defaultProfile.jpg'
              loading='lazy'
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
                onClick={(e) => deleteComment(postId, comment._id)}>
                <i className='fas fa-times' />
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CommentItem.defaultProps = {
  showActions: true,
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
