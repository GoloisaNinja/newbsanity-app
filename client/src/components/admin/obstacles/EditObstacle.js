import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../../Alert';
import { adminGetObstacleById } from '../../../actions/admin';
import EditObstacleForm from './EditObstacleForm';
import Spinner from '../../Spinner';

const EditObstacle = ({
  adminGetObstacleById,
  match,
  obstacles: { loading, obstacle },
}) => {
  useEffect(() => {
    adminGetObstacleById(match.params.id);
  }, [adminGetObstacleById, match.params.id]);
  return loading || obstacle === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div className='landing-intro'>
          <div style={{ marginBottom: '2rem' }}>
            <Link to='/admin/obstacles' className='btn profile-social'>
              Go Back to Obstacles
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>Edit</span>{' '}
            <span className='low-weight-span'> Obstacle</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            {obstacle.name2
              ? `You can edit the details for ${obstacle.name1} ${obstacle.name2} below.`
              : `You can edit the details for ${obstacle.name1} below.`}
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Your changes will occur in real-time. Be sure to check your horrible
            spelling! And remember to tap the image or hover over it to see the
            name in the overlay, just like how it appears in the obstacle
            section.
          </p>
          <p style={{ marginBottom: '1rem' }}>Fields with an * are required.</p>
        </div>
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>Obstacle </span>{' '}
          <span className='low-weight-span'>Edit Preview</span>
        </h3>
        <EditObstacleForm obstacle={obstacle} />
      </div>
    </Fragment>
  );
};

EditObstacle.propTypes = {
  adminGetObstacleById: PropTypes.func.isRequired,
  obstacles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  obstacles: state.admin.obstacles,
});

export default connect(mapStateToProps, { adminGetObstacleById })(EditObstacle);
