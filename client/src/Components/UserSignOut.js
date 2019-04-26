/* USER SIGN OUT COMPONENT
========================== 
(1) Confirm that user wants to sign out
(2) If user is not signed in, redirect to sign in page */



import React from 'react';
import {Consumer} from './Context';

const UserSignOut = () => (
  <div className="bounds">
    <h1>Are you sure you want to sign out?</h1>
    <div className="pad-bottom">
    <Consumer>
      {({actions}) => (
        <React.Fragment>
          <button className="button" onClick={actions.signOut}>Yes</button>
          <button className="button" onClick={actions.cancelSignOut}>No</button>
        </React.Fragment>
      )}
    </Consumer>
    </div>
  </div>   
)

export default UserSignOut;