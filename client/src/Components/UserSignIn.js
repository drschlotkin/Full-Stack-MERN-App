import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Consumer} from './Context'


export default class UserSignIn extends Component {

  cancelSignIn = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };
  
  render(){
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          
          <div>
          <Consumer>
          {({actions}) => (
            <form onSubmit = {actions.logIn}>
          
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={actions.userData} />
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" onChange={actions.userData} />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={this.cancelSignIn}>Cancel</button>
              </div>
            </form>
          )}
          </Consumer>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <NavLink to='/signup'>Click here</NavLink> to sign up!</p>
          
        </div>
        
      </div>
    );
  };
};

// UserSignIn.contextType = Consumer;
// MyClass.contextType = MyContext;
