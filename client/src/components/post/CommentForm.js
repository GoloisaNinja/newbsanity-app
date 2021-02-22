import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createComment } from '../../actions/posts';

const CommentForm = ({ createComment, postId }) => {
  const [text, setText] = useState('');

  return (
    <Fragment>
      <div className='post-create'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createComment(postId, { text });
            setText('');
          }}>
          <textarea
            className='post-textarea'
            placeholder='your comment here...'
            onChange={(e) => setText(e.target.value)}
            required
            name='text'
            value={text}
            cols={30}
            rows={4}></textarea>
          <input
            type='submit'
            value='Add your comment'
            style={{ marginTop: '1rem' }}
            className='btn create-post'
          />
        </form>
      </div>
    </Fragment>
  );
};

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
};

export default connect(null, { createComment })(CommentForm);
