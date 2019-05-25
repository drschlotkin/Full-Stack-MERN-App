import React from 'react';
import { NavLink } from 'react-router-dom';

const UnhandledError = () => (
  <div className="error">
    <h1>500 - Internal Server Error</h1>
    &nbsp;
    <p>Go back to course listings <NavLink to='/'>here</NavLink></p>
  </div>
);

export default UnhandledError;
