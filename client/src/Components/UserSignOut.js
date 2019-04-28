/* USER SIGN OUT COMPONENT
========================== 
(1) Confirm that user wants to sign out
(2) If user is not signed in, redirect to sign in page */



import React from 'react';
import { Consumer } from './Context';
import { NavLink } from 'react-router-dom';

const UserSignOut = () => (
  <div className="bounds">

   <Consumer>
      {({actions, user}) => (
        <div>
          {user.signedIn ?
            <React.Fragment>
              <h1>Are you sure you want to sign out?</h1>
              <div className="pad-bottom">
                <button className="button" onClick={actions.signOut}>Yes</button>
                <button className="button" onClick={actions.cancelSignOut}>No</button>
              </div>
            </React.Fragment>
            : <div className="error">
                <h1>You're not signed in!</h1>
                <p>Sign up <NavLink to='/signup'>here</NavLink>, or sign in <NavLink to='/signin'>here</NavLink></p>
              </div>
          }
        </div>
      )}
    </Consumer>

  </div>   
)

export default UserSignOut;