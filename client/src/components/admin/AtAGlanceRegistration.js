import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllEvents } from '../../actions/events';
import Spinner from '../Spinner';
import * as dayjs from 'dayjs';

const AtAGlanceRegistration = ({
  events: { loading, allevents },
  getAllEvents,
}) => {
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const thisMonth = dayjs().month();
  const prevMonth = dayjs().month(thisMonth - 1);

  let registrationsThisMonth = [];
  let registrationsLastMonth = [];
  let totalRegistrations = 0;

  allevents.forEach((event) => {
    totalRegistrations += event.registration.length;
    event.registration.forEach((eventReg) => {
      const regDate = dayjs(eventReg.date).month();
      if (regDate === thisMonth) {
        registrationsThisMonth.push(eventReg);
      } else if (regDate === prevMonth.$M) {
        registrationsLastMonth.push(eventReg);
      }
    });
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
            Registration <span style={{ color: '#ff0a0a' }}>Activity</span>
          </h2>
        </div>
        <div style={{ padding: '1rem', flex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <label>
              Total <span className='low-weight-span'>Registrations</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={totalRegistrations}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {totalRegistrations}
          </div>
          <div style={{ textAlign: 'center' }}>
            <label>
              Registrations <span className='low-weight-span'>Last Month</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={registrationsLastMonth.length}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {registrationsLastMonth.length}
          </div>
          <div style={{ textAlign: 'center' }}>
            <label>
              Registrations <span className='low-weight-span'>This Month</span>
            </label>
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <progress
              style={{ marginBottom: '.5rem' }}
              className='workout-progress'
              min='0'
              max='100'
              value={registrationsThisMonth.length}></progress>{' '}
          </div>
          <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            {registrationsThisMonth.length}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AtAGlanceRegistration.propTypes = {
  getAllEvents: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, { getAllEvents })(
  AtAGlanceRegistration
);
