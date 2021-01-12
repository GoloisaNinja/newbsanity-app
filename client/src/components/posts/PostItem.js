import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { deletePost, likePost, unlikePost } from '../../actions/posts';

const PostItem = ({
  unlikePost,
  likePost,
  deletePost,
  post,
  auth: { user },
}) => {
  const [avatar, hasAvatar] = useState(false);
  useEffect(() => {
    checkAvatar();
  }, [post]);

  const checkAvatar = async () => {
    try {
      const res = await axios.get(`/api/user/${post.user}/avatar`);
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
              src={`/api/user/${post.user}/avatar`}
            />
          ) : (
            <img className='post-avatar' src='/img/defaultProfile.jpg' />
          )}

          <h5 className='post-user'>{post.name}</h5>
        </div>
        <div className='post-text-container'>
          <p className='post-text'>{post.text}</p>
          <p className='post-date'>posted: {post.date.slice(0, 10)}</p>
          <div className='post-social-container'>
            <button
              className='btn post-like'
              onClick={(e) => likePost(post._id)}>
              <i className='far fa-thumbs-up' />{' '}
              {post.likes.length > 0 && <span>{post.likes.length}</span>}
            </button>
            <button
              className='btn post-like'
              onClick={(e) => unlikePost(post._id)}>
              <i className='far fa-thumbs-down' />
            </button>
            <button className='btn post-discussion'>Discussion</button>

            {post.user === user._id && (
              <button
                className='btn post-delete'
                onClick={(e) => deletePost(post._id)}>
                <i className='fas fa-times' />
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(
  PostItem
);
