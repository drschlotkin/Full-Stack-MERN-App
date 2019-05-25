/* SIGN UP COMPONENT
====================
(1) Create user
(2) Save user to database, global state and localStorage
(3) Automatically sign user in to application*/



import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';

// Regular expression to check for valid email address
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);


export default class UserSignUp extends Component {

  state= {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: []
  };


  // Reset errors
  componentDidMount = () => {
    this.setState({ errors: [] })
  }


  /* USER SIGN UP VALIDATION
  ==========================
  Validate all user inputs before proceeding to POST route*/

  validation = (dispatch, event) => {
    event.preventDefault();
    let errors = []
    const { firstName, lastName, emailAddress, password, confirmPassword } = this.state
    
    if (firstName.length === 0) errors.push('Please enter your first name');
    if (lastName.length === 0) errors.push('Please enter your last name');

    if (emailAddress.length === 0) {
      errors.push('Please enter an email address');
    } else if (!emailRegex.test(emailAddress)){
      errors.push('Please enter a VALID email address');
    };

    if (password.length === 0){
      errors.push('Please enter a password');
    } else if (password !== confirmPassword){
      errors.push('Passwords do not match');
    };
    
    this.setState({ errors });

    if (errors.length === 0) this.signup(dispatch);
  };


  /* USER POST ROUTE
  ==================
  Save user to database and sign user in to application*/

  signup = (dispatch) => {
    const { firstName, lastName, emailAddress, password } = this.state;
    const history = this.props.history
    axios.post(`/users`, { firstName, lastName, emailAddress, password, isSignedIn: true})
      .then(() => {
        axios.get(`/users`, { auth: { username: emailAddress, password } })
          .then(res => {
            const { ID } = res.data;
            const user = { ID, firstName, lastName, emailAddress, password, signedIn: true };
            localStorage.clear()
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
              type: 'SIGN_IN',
              payload: user
            });
            history.push("/");
          }).catch(err => {
            if (err) history.push('/error')
          });
      }).catch(err => {
        if (err.response.status === 409){
          let errors = [];
          errors.push('An account already exists with that username');
          this.setState({ errors }); 
        }else{
          history.push('/error');
        }
      });
  }; 


  // Assign each state value from input fields
  stateData = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  // Cancel form event
  cancel = () => {
    this.props.history.push("/");
  };


  /* RENDER ELEMENTS TO DOM
  ========================= */
  render(){
    const { errors } = this.state
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