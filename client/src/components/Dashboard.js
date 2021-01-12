import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from './Alert';
import Spinner from './Spinner';

const Dashboard = ({ auth: { user, loading } }) => {
  return (
    <div>
      {!loading ? (
        <Fragment>
          <Alert />
          <p>Welcome your Dashboard {user.name}</p>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
