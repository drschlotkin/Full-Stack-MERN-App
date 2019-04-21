import React from 'react';
import {Consumer} from './Context'

const UserSignOut = () => (
  <div className="bounds">
    <h1>Are you sure you want to sign out?</h1>
    <div className="pad-bottom">
    <Consumer>
      {({actions}) => (
        <React.Fragment>
          <button className="button" onClick={actions.logOut}>Yes</button>
          <button className="button" onClick={actions.cancel}>No</button>
        </React.Fragment>
      )}
    </Consumer>
    </div>
  </div>
    
)

export default UserSignOut;