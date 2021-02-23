import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllEvents } from '../../../actions/events';
import Spinner from '../../Spinner';
import Event from './Event';

const Events = ({ events: { loading, allevents }, getAllEvents }) => {
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);
  return loading ? (
    <Spinner />
  ) : (
    allevents &&
      allevents.length > 0 &&
      allevents.map((event) => <Event key={event._id} event={event} />)
  );
};

Events.propTypes = {
  events: PropTypes.object.isRequired,
  getAllEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, { getAllEvents })(Events);
