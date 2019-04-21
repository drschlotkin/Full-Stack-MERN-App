import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Consumer} from './Context'


export default class UserSignIn extends Component {
 
  render(){
    
    
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
          <Consumer>       
            {value  => {
              const {actions, user} = value
              return (
                <React.Fragment>
                  {user.errors.length > 0 ?    
                    <div>
                      <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                          <ul>
                          {Object.keys(user.errors).map((key, i) => {
                            return (
                            <li key={key}>{user.errors[i]}</li>
                            )
                          })}
                          </ul>
                        </div>
                    </div>
                      : null
                  }

                  <form onSubmit ={ actions.signinValidation}>
                    <div>
                      <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={actions.stateData} />
                    </div>
                    <div>
                      <input id="password" name="password" type="password" className="" placeholder="Password" onChange={actions.stateData} />
                    </div>
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit">Sign In</button>
                      <button className="button button-secondary" onClick={actions.cancel}>Cancel</button>
                    </div>
                  </form>
                </React.Fragment>
              )
            }}
          </Consumer>
          </div>
          <p>Don't have a user account? <NavLink to='/signup'>Click here</NavLink> to sign up!</p>
        </div>
      </div>
    );
  };
};
