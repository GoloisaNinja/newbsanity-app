import React, { Fragment } from 'react';
import loader from '../layout/fitnessLoader.gif';

const Spinner = () => (
  <Fragment>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
      }}>
      <img
        src={loader}
        style={{ width: '40%', margin: '0 auto', display: 'block' }}
        alt='Loading...'
      />
    </div>
  </Fragment>
);

export default Spinner;
