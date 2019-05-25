import React from 'react';
import { NavLink } from 'react-router-dom';

const Forbidden = () => (
  <div className="error">
    <h1>Forbidden</h1>
    <h3>You are not authorized to view the page you requested</h3>
    &nbsp;
    <p>Go back to course listings <NavLink to='/'>here</NavLink></p>
  </div>
);

export default Forbidden;


