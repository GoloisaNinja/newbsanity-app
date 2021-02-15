import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAdvice } from '../../actions/advice';
import Spinner from '../Spinner';

const ProfileAdvice = ({
  auth: { user },
  advice: { loading, advice },
  getAdvice,
}) => {
  useEffect(() => {
    getAdvice();
  }, [getAdvice, user._id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='profile-advice-container'>
        <div className='profile-avatar'>
          <h2>
            Jarrett's
            <span style={{ color: '#ff0a0a' }}> Corner</span>
          </h2>
        </div>
        <div className='profile-bio' style={{ flex: 1 }}>
          <div className='profile-bio__header'>
            <h3>
              <span className='red-span' style={{ color: '#ff0a0a' }}>
                Your Daily{' '}
              </span>{' '}
              <span className='low-weight-span'>Advice</span>
            </h3>
          </div>
          <p style={{ borderBottom: '3px solid #ff0a0a' }}>
            Channel your inner Jarrett
          </p>

          <div className='profile-events'>
            <h3 className='event-title'>
              Advice Theme:{' '}
              <span className='low-weight-span'>{advice.theme}</span>
            </h3>
            <p className='event-text'>
              <i className='fas fa-quote-left' /> {advice.advice}{' '}
              <i className='fas fa-quote-right' />
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <div>
                <img
                  className='advice-img'
                  src='/img/jar1.jpg'
                  alt='jarrett looking judgey'
                />{' '}
              </div>
              <div>
                <h5 style={{ textAlign: 'right', paddingRight: '2rem' }}>
                  <span style={{ fontStyle: 'italic' }}>
                    {' '}
                    - Jarrett <span className='low-weight-span'>Newby</span>
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProfileAdvice.propTypes = {
  getAdvice: PropTypes.func.isRequired,
  advice: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  advice: state.advice,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAdvice })(ProfileAdvice);
