import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostItem from './PostItem';
import { getAllPosts } from '../../actions/posts';
import Spinner from '../Spinner';
import Alert from '../Alert';

const Posts = ({ posts: { loading, posts }, getAllPosts }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return (
    <Fragment>
      <Alert />
      {!loading ? (
        <div className='content-container'>
          <div className='landing-intro'>
            <h1 style={{ marginBottom: '1rem' }}>
              <span className='red-span'>Newbsanity</span>{' '}
              <span className='low-weight-span'>Member Forum</span>
            </h1>
            <p style={{ marginBottom: '1rem' }}>
              Wecome to the member community forum. Create forum discussion
              threads and topics. Trash talk your enemies!
            </p>
          </div>

          <h3 className='text-type-effect'>
            <i className='far fa-comments' />{' '}
            <span className='red-span'> Start</span>{' '}
            <span className='low-weight-span'>a thread...</span>{' '}
          </h3>
          <PostForm />
          {posts.length > 0 ? (
            <Fragment>
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </Fragment>
          ) : (
            <Fragment>No Posts currently...</Fragment>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
