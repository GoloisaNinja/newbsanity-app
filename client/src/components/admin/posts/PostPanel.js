import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../Alert';
import PostsFilters from './PostsFilters';
import Posts from './Posts';

const PostPanel = () => {
  return (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div className='landing-intro'>
          <div style={{ marginBottom: '2rem' }}>
            <Link to='/admin' className='btn profile-social'>
              Go Back to Main Admin
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>Post</span>{' '}
            <span className='low-weight-span'> Admin Panel</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Use this panel to manage Newbsaniacs Posts. See below for available
            Admin Actions. Post cards are ordered in the following fashion:
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ul style={{ marginBottom: '1rem' }}>
              <li
                style={{
                  fontWeight: 400,
                  fontSize: '1.4rem',
                  color: '#fff',
                }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                post user avatar
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                post user name - hidden on small devices
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                post text
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                post likes count - hidden on small devices
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                post comment count
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                post date - hidden on small devices
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '1.4rem', color: '#fff' }}>
                <i
                  className='fas fa-skull-crossbones'
                  style={{ color: '#ff0a0a' }}
                />{' '}
                delete post action
              </li>
            </ul>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            If a post is deleted it cannot be retrieved. Only delete a post if
            it should be removed, or if you just don't like the person that
            posted it.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            If post text is cut off, full post text can be viewed by clicking on
            the post text itself. The card will expand to show the full post.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Post searches are by Post Text by default - however you can also
            search posts by user name text.
          </p>
        </div>
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>All </span>{' '}
          <span className='low-weight-span'>Posts</span>
        </h3>
        <PostsFilters />
        <Posts />
      </div>
    </Fragment>
  );
};

export default PostPanel;
