import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <div className="header">
    <div className="bounds">
      <NavLink to='/' className="header--logo">Courses</NavLink>
      <nav>
        <NavLink to='/signup' className="signup">Sign Up</NavLink>
        <NavLink to='/signin' className="signin">Sign In</NavLink>
      </nav>
    </div>
  <hr />
  </div>
);

export default Header;