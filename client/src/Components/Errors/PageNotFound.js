import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => (
  <div className="error">
    <h1>404</h1>
    <h3>Sorry! The page you are trying to reach does not exist</h3>
    &nbsp;
    <p>Go back to course listings <NavLink to='/'>here</NavLink></p>
  </div>
);

export default PageNotFound;


