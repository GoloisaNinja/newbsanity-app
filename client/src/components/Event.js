import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Event = (props) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Fragment>
      {props.events.map((event) => (
        <div
          className='flex-container'
          data-aos={'fade-right'}
          data-aos-easing={'ease-in-out'}
          data-aos-duration={1000}
          key={event.title}>
          <div>
            {event.mediaTypeIframe ? (
              <iframe
                src={event.mediaLink}
                title={event.title}
                className='event-img'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen></iframe>
            ) : (
              <img
                className='event-img'
                src={event.mediaLink}
                alt={event.title}
              />
            )}
          </div>
          <Link to='/'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className='event-title'>
                {event.title} <span className='low-weight-span'></span>
              </h3>
              <h5 style={{ paddingLeft: '2rem' }}>
                Date:{' '}
                <span className='low-weight-span'>
                  {event.date.slice(0, 10)}
                </span>
              </h5>
              <h5 style={{ paddingLeft: '2rem' }}>
                Time: <span className='low-weight-span'>{event.time}</span>
              </h5>
              <p
                className='event-text'
                data-aos={'fade-down'}
                data-aos-easing={'ease-in-out'}
                data-aos-duration={800}
                data-aos-delay={500}>
                {event.text}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </Fragment>
  );
};

export default Event;
