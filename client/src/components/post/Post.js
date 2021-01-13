import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/posts';
import Spinner from '../Spinner';
import Alert from '../Alert';
import CommentForm from './CommentForm';
import PostItem from '../posts/PostItem';
import CommentItem from './CommentItem';

const Post = ({ getPost, posts: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div style={{ marginBottom: '2.5rem', marginTop: '.25rem' }}>
          <Link to='/posts' className='btn btn-forum'>
            Back <span className='low-weight-span'>to Forum</span>
          </Link>
        </div>
        <PostItem post={post} showActions={false} />
        <h3 className='text-type-effect2'>
          <i className='far fa-comments' />{' '}
          <span className='red-span'> Leave</span>{' '}
          <span className='low-weight-span'>a comment...</span>{' '}
        </h3>
        <CommentForm postId={post._id} />
        <Fragment>
          {post.comments.length > 0 ? (
            <Fragment>
              {post.comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                />
              ))}
            </Fragment>
          ) : (
            <div>No comments yet...</div>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPost })(Post);
