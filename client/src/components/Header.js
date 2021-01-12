import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../actions/auth';

const Header = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
  const authLinks = (
    <ul>
      <li>
        <Link className='navbar-links' to='/pricing'>
          <i className='fas fa-money-check-alt' id='hide-sm' /> shop
        </Link>
      </li>
      <li>
        <Link className='navbar-links' to='/posts'>
          <i className='fas fa-comments' id='hide-sm' /> forum
        </Link>
      </li>
      <li>
        <Link className='navbar-links' to='/dashboard'>
          <i className='fas fa-user-circle' />{' '}
          <span id='hide-sm'>dashboard</span>
        </Link>
      </li>
      <li>
        <Link className='navbar-links' onClick={logoutUser} to='/login'>
          <i className='fas fa-sign-out-alt' /> <span id='hide-sm'>logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link className='navbar-links' to='/pricing'>
          <i className='fas fa-money-check-alt' id='hide-sm' /> pricing
        </Link>
      </li>
      <li>
        <Link className='navbar-links' to='/obstacles'>
          <i className='fas fa-running' id='hide-sm' /> obstacles
        </Link>
      </li>
      <li>
        <Link className='navbar-links' to='/about'>
          <i className='fas fa-question-circle' id='hide-sm' /> about
        </Link>
      </li>
      <li>
        <Link className='navbar-links' to='/login'>
          <i className='fas fa-user-ninja' id='hide-sm' /> login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar'>
      <h1>
        <Link to='/' className='navbar-links'>
          <img className='skull' src='/img/skull.png' /> NEWBSANITY
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);
