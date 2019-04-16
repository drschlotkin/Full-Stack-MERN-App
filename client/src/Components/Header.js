import React from 'react';
import {NavLink} from 'react-router-dom';
import { Consumer } from './Context'

const Header = () => {
  
  return (
    <div className="header">
      <div className="bounds">
        <NavLink to='/' className="header--logo">Courses</NavLink>
        <Consumer>
          {({firstName, signedIn, actions}) => (
            <nav>
              {signedIn ? 
                <React.Fragment>
                  <span>Welcome {firstName}</span>
                  <NavLink to="/" className="signout" onClick={actions.logOut}>Sign Out</NavLink>
                </React.Fragment>
              :
                <React.Fragment>
                  <NavLink to='/signup' className="signup">Sign Up</NavLink>
                  <NavLink to='/signin' className="signin">Sign In</NavLink>
                </React.Fragment>
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

