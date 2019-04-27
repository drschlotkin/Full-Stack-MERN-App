/* SIGN IN COMPONENT
====================
(1) Redirected here if there is an attempt to create or update course
(2) Show validation errors if necessary before signing in user */



import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context';


// Regular expression to check for valid email address
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);


export default class UserSignIn extends Component {
  
  state = {
    errors: [],
    emailAddress: '',
    password: ''
  }
  
  // Reset error messages when page loads/reloads
  componentDidMount = () => {
    this.setState( { errors: [] } );
  };


   /* USER SIGN IN VALIDATION
  ==========================
  Validate all user inputs before proceeding to POST route*/

  validation = (e, signIn) => {
    e.preventDefault();

    let errors = [];
    const { emailAddress, password } = this.state;

    if (password.length === 0) errors.push('Please enter a password');
    
    if (emailAddress.length === 0) {
      errors.push('Please enter an email address');
    } else if (!emailRegex.test(emailAddress)){
      errors.push('Please enter a VALID email address');
    };

    this.setState({ errors });

    if (errors.length === 0){
      const {emailAddress, password} = this.state;
      signIn({emailAddress, password});
    };
  };


  // Assign each state value from input fields
  stateData = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  // Cancel sign in
  cancel = (event) => {
    event.preventDefault()
    this.props.history.push("/");
  };
 

  /* RENDER ELEMENTS TO DOM
  ========================= */

  
render(){
  const { errors } = this.state;   
  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        
        <Consumer>       
          {({actions, user})  => {  
            return (
              <React.Fragment>
                {errors.length > 0 ?    
                  <div>
                    <h2 className="validation--errors--label">Error!</h2>
                      <div className="validation-errors">
                        <ul>
                          {Object.keys(errors).map((key, i) => {
                            return (
                              <li key={key}>{errors[i]}</li>
                            )
                          })}
                        </ul>
                      </div>
                  </div>
                  : user.errors.length > 0 ?
                  <div>
                  <h2 className="validation--errors--label">Error!</h2>
                    <div className="validation-errors">
                      <ul>
                        <li>{user.errors}</li>
                      </ul>
                    </div>
                  </div>
                  : null
                }    
                <form onSubmit ={e => this.validation(e, actions.signIn)}>
                  <div>
                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.stateData} />
                  </div>
                  <div>
                    <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.stateData} />
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                  </div>
                </form>
              </React.Fragment>
            )
          }}
        </Consumer>
        <p>Don't have a user account? <NavLink to='/signup'>Click here</NavLink> to sign up!</p>
      </div>
    </div>
  );
};
};
