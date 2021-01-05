import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import Alert from '../Alert';

const Register = ({ isAuthenticated, registerUser, setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser(name, email, password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='content-container'>
      <Alert />
      <div className='landing-intro'>
        <h1 style={{ marginBottom: '1rem' }}>
          <span className='red-span'>Register</span>{' '}
          <span className='low-weight-span'>for an account</span>
        </h1>
        <p style={{ marginBottom: '1rem' }}>
          Having a Newbsanity account allows you to register for events and
          purchase package deals. You'll also get access to the social member
          forum where you can post, comment, like and stay up to date on what
          the Newbsanity communnity is talking about!
        </p>
      </div>

      <div className='form-container'>
        <form className='form-login' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              className='form-input'
              type='name'
              required
              id='name'
              name='name'
              onChange={(e) => onChange(e)}></input>
            <label className='form-label'>your name</label>
          </div>
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
          <div className='form-group'>
            <input
              className='form-input'
              type='password'
              required
              id='password2'
              name='password2'
              onChange={(e) => onChange(e)}></input>
            <label className='form-label'>confirm password</label>
          </div>

          <button className='btn'>Register</button>
        </form>
      </div>
      <div style={{ flexGrow: 1 }}>
        <p style={{ marginTop: '1rem' }}>
          Already have an account? Sign in <Link to='/login'>here</Link>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  registerUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser, setAlert })(Register);
