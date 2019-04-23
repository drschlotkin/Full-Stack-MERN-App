/* SIGN UP COMPONENT
====================
(1) Create user, save to database, and automatically sign in. 
(2) Display validation errors if necessary */



import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export default class UserSignUp extends Component {

  state= {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: []
  };


  /* USER SIGN UP VALIDATION
  ==========================
  Validate all user inputs before proceeding to POST route*/

  validation = (dispatch, event) => {
    event.preventDefault();
    let errors = []
    const { firstName, lastName, emailAddress, password, confirmPassword } = { ...this.state }
    
    if (firstName.length === 0) errors.push('Please enter your First Name');
    if (lastName.length === 0) errors.push('Please enter your Last Name');

    if (emailAddress.length === 0) {
      errors.push('Please enter a valid Email Address');
    } else if (!emailRegex.test(emailAddress)){
      errors.push('Invalid email address');
    };

    if (password.length === 0){
      errors.push('Please enter a Password');
    } else if (password !== confirmPassword){
      errors.push('Passwords do not match');
    };
    
    this.setState({ errors: errors });

    if (errors.length === 0) this.signup(dispatch);
  };


  /* USER POST ROUTE
  ==================
  Save user to database and sign user in to application*/

  signup = (dispatch) => {
    const { firstName, lastName, emailAddress, password } = { ...this.state }
    axios.post(`http://localhost:5000/api/users`, {
      firstName,
      lastName,
      emailAddress,
      password,
      isSignedIn: true
    }).then(() => {
      axios.get(`http://localhost:5000/api/users`, {
        auth: {
          username: this.state.emailAddress,
          password: this.state.password
        }
      }).then(res => {
        const {ID, firstName, lastName, userName} = { ...res.data };
        const userData = { ID, firstName, lastName, userName, password: this.state.password };
        dispatch({
          type: 'SIGN_IN',
          payload: userData
        });
        this.props.history.push("/");
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err.response.status)
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
          <h1 className="append">Sign Up</h1>

          <Consumer>
            {({user}) => {
              return (
                <React.Fragment>
                  {errors.length > 0  ?    
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

                  <form onSubmit = {this.validation.bind(this, user.dispatch)}>
                    <div>
                      <input id="firstName" name="firstName" type="text" placeholder="First Name" onChange={this.stateData}/>
                    </div>
                    <div>
                      <input id="lastName" name="lastName" type="text" placeholder="Last Name" onChange={this.stateData}/>
                    </div>
                    <div>
                      <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={this.stateData}/>
                    </div>
                    <div>
                      <input id="password" name="password" type="password" placeholder="Password" onChange={this.stateData}/>
                    </div>
                    <div>
                      <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.stateData}/>
                    </div>
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit">Sign Up</button>
                      <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                    </div>
                  </form>
                  <p>Already have a user account? <NavLink to='/signin'>Click here</NavLink> to sign in!</p>
                </React.Fragment>
              )
            }}
          </Consumer>

        </div>    
      </div>
    );
  };
};