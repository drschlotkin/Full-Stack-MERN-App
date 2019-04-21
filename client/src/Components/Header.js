import React from 'react';
import {NavLink} from 'react-router-dom';
import {Consumer} from './Context';


const Header = () => {
  
  return (
    <div className="header">
      <div className="bounds">
        <NavLink to='/' className="header--logo">Courses</NavLink>

        <Consumer>
          {({user}) => (
            <nav>
              {user.signedIn ? 
                <React.Fragment>
                  <span>Welcome {user.firstName} {user.lastName}</span>
                  <NavLink to="/signout" className="signout">Sign Out</NavLink>
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

