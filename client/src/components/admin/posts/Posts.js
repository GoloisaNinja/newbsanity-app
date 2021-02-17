import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getVisiblePosts from '../../../selectors/adminPosts';
import Post from './Post';

const Posts = ({ posts, filteredPosts }) => {
  return (
    posts &&
    posts.length > 0 &&
    filteredPosts.map((post) => <Post key={post._id} post={post} />)
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  filteredPosts: getVisiblePosts(state.posts.posts, state.filters.adminPost),
});

export default connect(mapStateToProps)(Posts);
