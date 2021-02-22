import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEventComment } from '../../actions/events';

const EventCommentForm = ({ createEventComment, eventId }) => {
  const [text, setText] = useState('');

  return (
    <Fragment>
      <div className='post-create'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createEventComment(eventId, { text });
            setText('');
          }}>
          <textarea
            className='post-textarea'
            placeholder='your comment here...'
            required
            onChange={(e) => setText(e.target.value)}
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

EventCommentForm.propTypes = {
  createEventComment: PropTypes.func.isRequired,
};

export default connect(null, { createEventComment })(EventCommentForm);
