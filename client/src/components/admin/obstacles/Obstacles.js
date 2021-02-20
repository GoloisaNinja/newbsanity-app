import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminGetObstacles } from '../../../actions/admin';
import Spinner from '../../Spinner';
import Obstacle from './Obstacle';

const Obstacles = ({
  obstacles: { loading, obstacles },
  adminGetObstacles,
}) => {
  useEffect(() => {
    adminGetObstacles();
  }, [adminGetObstacles]);
  return loading ? (
    <Spinner />
  ) : (
    obstacles &&
      obstacles.length > 0 &&
      obstacles.map((obstacle) => (
        <Obstacle key={obstacle._id} obstacle={obstacle} />
      ))
  );
};

Obstacles.propTypes = {
  obstacles: PropTypes.object.isRequired,
  adminGetObstacles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  obstacles: state.admin.obstacles,
});

export default connect(mapStateToProps, { adminGetObstacles })(Obstacles);
