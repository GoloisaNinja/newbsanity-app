import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/posts';
import Spinner from '../Spinner';
import * as dayjs from 'dayjs';

const AtAGlancePosts = ({ posts: { loading, posts }, getAllPosts }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const thisMonth = dayjs().month();

  let postsThisMonth = [];
  let totalComments = 0;

  posts.forEach((post) => {
    totalComments += post.comments.length;
    const postDate = dayjs(post.createdAt).month();
    if (postDate === thisMonth) {
      postsThisMonth.push(post);
    }
  });

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        className='admin-glance-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <div
          style={{
            marginBottom: '1.5rem',
            textAlign: 'center',
            backgroundColor: '#cecece',
            width: '100%',
          }}>
          <h2 style={{ color: '#0e1013' }}>
            Posts <span style={{ color: '#ff0a0a' }}>Panel</span>
          </h2>
        </div>
        <div style={{ padding: '1rem', flex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <label>
              Total <span className='low-weight-span'>Posts</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={posts.length}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {posts.length}
          </div>
          <div style={{ textAlign: 'center' }}>
            <label>
              Total <span className='low-weight-span'>Comments</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={totalComments}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {totalComments}
          </div>
          <div style={{ textAlign: 'center' }}>
            <label>
              Total <span className='low-weight-span'>Posts This Month</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={postsThisMonth.length}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {postsThisMonth.length}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AtAGlancePosts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getAllPosts })(AtAGlancePosts);
