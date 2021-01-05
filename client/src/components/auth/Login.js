import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import Alert from '../Alert';

const Login = ({ isAuthenticated, loginUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='content-container'>
      <Alert />
      <div className='landing-intro'>
        <h1 style={{ marginBottom: '1rem' }}>
          <span className='red-span'>Login</span>{' '}
          <span className='low-weight-span'>to your account</span>
        </h1>
        <p style={{ marginBottom: '1rem' }}>
          Thank you for being a valuable member of the Newbsanity community!
          Login below to access your profile, see upcoming events and
          participate in the members only forum. Coming soon: purchase
          Newbsanity memberships and other services!
        </p>
      </div>

      <div className='form-container'>
        <form className='form-login' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              className='form-input'
              type='email'
              required
              id='email'
              name='email'
              onChange={(e) => onChange(e)}></input>
            <label className='form-label'>email</label>
          </div>
          <div className='form-group'>
            <input
              className='form-input'
              type='password'
              required
              id='password'
              name='password'
              onChange={(e) => onChange(e)}></input>
            <label className='form-label'>password</label>
          </div>

          <button className='btn'>Login</button>
        </form>
      </div>
      <div style={{ flexGrow: 1 }}>
        <p style={{ marginTop: '1rem' }}>
          Dont have an account? Register <Link to='/register'>here</Link>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
