import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminDeletePost } from '../../../actions/admin';
import Modal from '../../Modal';

const Post = ({ post, adminDeletePost }) => {
  const [show, setShow] = useState(false);
  const [postId, setPostId] = useState('');
  const [content, setContent] = useState();

  const handleDelete = (id, name) => {
    setPostId(id);
    setContent({
      title: 'Delete This Post?',
      body: `Are you sure you want to delete this post by to ${name}?`,
      icon: '/img/robot.png',
      type: 'decision',
    });
    setShow(true);
  };

  const handleClose = (shouldDelete) => {
    setShow(false);
    if (shouldDelete) {
      adminDeletePost(postId);
    }
  };
  const [openText, setOpenText] = useState(false);
  return (
    <Fragment>
      <div className='post-card-container' key={post._id}>
        <div className='post-card-inner'>
          <div className='user-card__avatar'>
            {post.avatar ? (
              <img
                className='avatar-profile'
                src={`/api/user/${post.user}/avatar`}
                loading='lazy'
                alt='avatar'
              />
            ) : (
              <img
                className='avatar-profile'
                src='/img/defaultProfile.jpg'
                loading='lazy'
                alt='avatar'
              />
            )}
          </div>
          <div id='hide-sm' className='post-card__details'>
            {post.name}
          </div>

          <button
            onClick={(e) => setOpenText(!openText)}
            style={{
              background: 'none',
              cursor: 'pointer',
              border: 'none',
              fontSize: '1.2rem',
              fontFamily: 'Oswald, sans-serif',
              textTransform: 'uppercase',
            }}>
            <div className='post-card__text'>{post.text}</div>
          </button>

          <div id='hide-sm' className='post-card__details'>
            {post.likes.length}
          </div>
          <div className='post-card__details'>{post.comments.length}</div>
          <div id='hide-sm' className='post-card__details'>
            {post.date.slice(0, 10)}
          </div>

          <div>
            <button
              style={{ marginTop: '1rem' }}
              className='btn user-delete'
              onClick={(e) => handleDelete(post._id, post.name)}>
              <i className='fas fa-trash-alt' />
            </button>
          </div>
        </div>
        {openText && (
          <Fragment>
            <div
              style={{
                marginLeft: '2rem',
                marginBottom: '1rem',
                maxWidth: '80%',
                borderBottom: '3px solid #ff0a0a',
                fontSize: '1.4rem',
              }}>
              <p style={{ marginBottom: '.5rem', fontSize: '1.4rem' }}>
                {post.text}
              </p>
            </div>
          </Fragment>
        )}
      </div>

      <Modal show={show} handleClose={handleClose} content={content} />
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  adminDeletePost: PropTypes.func.isRequired,
};

export default connect(null, { adminDeletePost })(Post);
