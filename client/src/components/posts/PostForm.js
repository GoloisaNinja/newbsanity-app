import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../actions/posts';

const PostForm = ({ createPost }) => {
  const [text, setText] = useState('');

  return (
    <Fragment>
      <div className='post-create'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost({ text });
            setText('');
          }}>
          <textarea
            className='post-textarea'
            placeholder='start typing here...'
            onChange={(e) => setText(e.target.value)}
            name='text'
            value={text}
            cols={30}
            rows={4}></textarea>
          <input
            type='submit'
            value='Create Post'
            style={{ marginTop: '1rem' }}
            className='btn create-post'
          />
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(PostForm);
