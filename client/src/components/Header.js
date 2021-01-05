import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='navbar'>
      <h1>
        <Link to='/' className='navbar-links'>
          <img className='skull' src='/img/skull.png' /> NEWBSANITY
        </Link>
      </h1>
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
    </nav>
  );
};

export default Header;
