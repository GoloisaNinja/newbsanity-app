import React from 'react';
import { connect } from 'react-redux';
import Alert from './Alert';

const Dashboard = ({ name }) => {
  return (
    <div>
      <Alert />
      <p>Welcome your Dashboard {name}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.auth.user.user.name,
});

export default connect(mapStateToProps)(Dashboard);
