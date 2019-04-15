import React from 'react';
import {NavLink} from 'react-router-dom';
import { Consumer } from './Context'

const Header = () => {

  return (
    <div className="header">
      <div className="bounds">
        <NavLink to='/' className="header--logo">Courses</NavLink>
        <Consumer>
          {({signedIn, name}) => (
            <nav>
              {signedIn ? 
                <div>
                  <span>Welcome {name}</span>
                  <NavLink to="/" className="signout">Sign Out</NavLink>
                </div>
              :
                <div>
                  <NavLink to='/signup' className="signup">Sign Up</NavLink>
                  <NavLink to='/signin' className="signin">Sign In</NavLink>
                </div>
              }
            </nav>
          )}
        </Consumer>
        
      </div>
    <hr />
    </div>
  )
};

export default Header;

