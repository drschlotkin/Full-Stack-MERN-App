/* SIGN IN COMPONENT
====================
(1) Redirected here if there is an attempt to create or update course
(2) Show validation errors if necessary before signing in user */



import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export default class UserSignIn extends Component {

  state= {
    emailAddress: '',
    password: '',
    errors: []
  };


  /* USER SIGN IN VALIDATION
  ==========================
  Validate all user inputs before proceeding to POST route*/

  validation = (dispatch, e) => {
    e.preventDefault();
    let errors = [];
    const { emailAddress, password } = { ...this.state };

    if (password.length === 0) errors.push('Please enter a Password');
    
    if (emailAddress.length === 0) {
      errors.push('Please enter a valid Email Address');
    } else if (!emailRegex.test(emailAddress)){
      errors.push('Invalid email address');
    };

    this.setState({ errors: errors });

    if (errors.length === 0) this.signIn(dispatch);
  };
  

  /* USER GET ROUTE
  ==================
  Assign user to state by dispatching data to Provider class (./Context/index.js) */
  
  signIn = (dispatch) => {
    axios.get(`http://localhost:5000/api/users`, {
      auth: {
        username: this.state.emailAddress,
        password: this.state.password
      }}).then(res => {
        const { ID, firstName, lastName, userName } = {...res.data};
        const userData = { ID, firstName, lastName, userName, password: this.state.password };
        dispatch({
          type: 'SIGN_IN',
          payload: userData
        });
        this.props.history.push("/");
      }).catch(err => {
        console.log(err);
    });
  };
      

  // Assign each state value from input fields
  stateData = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  // Cancel form event
  cancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };


  render(){
    const { errors } = { ...this.state }
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>

          <Consumer>       
            {({user})  => {  
              return (
                <React.Fragment>
                  {errors.length > 0 ?    
                    <div>
                      <h2 className="validation--errors--label">Validation errors</h2>
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
                      : null
                  }    
                  <form onSubmit ={this.validation.bind(this, user.dispatch)}>
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

          </div>
          <p>Don't have a user account? <NavLink to='/signup'>Click here</NavLink> to sign up!</p>
        </div>
      </div>
    );
  };
};
