import React, { Fragment } from 'react';

const EventItem = ({ event }) => {
  return (
    <Fragment>
      <div className='post-container'>
        <div className='post-text-container'>
          <h3 className='event-heading'>
            {event.title} <span style={{ color: '#ff0a0a' }}>Discussion</span>{' '}
            Board
          </h3>
          <p className='event-text'>{event.text}</p>
          <p className='post-date'>Date: {event.date.slice(0, 10)}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default EventItem;
