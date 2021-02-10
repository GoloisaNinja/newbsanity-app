import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, likePost, unlikePost } from '../../actions/posts';

const PostItem = ({
  unlikePost,
  likePost,
  deletePost,
  post,
  auth: { user },
  showActions,
}) => {
  return (
    <Fragment>
      <div className='post-container'>
        <div className='post-user-container'>
          {post.avatar ? (
            <img
              className='post-avatar'
              src={`/api/user/${post.user}/avatar`}
              loading='lazy'
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

          <h5 className='post-user'>{post.name}</h5>
        </div>
        <div className='post-text-container'>
          <p className='post-text'>{post.text}</p>
          <p className='post-date'>posted: {post.date.slice(0, 10)}</p>
          {showActions && (
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
              <Link className='btn post-discussion' to={`/post/${post._id}`}>
                Discussion
                {post.comments.length > 0 && (
                  <span className='post-discussion__count'>
                    {' '}
                    {post.comments.length}{' '}
                  </span>
                )}
              </Link>

              {post.user === user._id && (
                <button
                  className='btn post-delete'
                  onClick={(e) => deletePost(post._id)}>
                  <i className='fas fa-times' />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

PostItem.defaultProps = {
  showActions: true,
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
