import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    isSignedIn: false
  };

  onSubmit = (event) => {
    event.preventDefault();
    
    if (this.state.password === this.state.confirmPassword){
      axios.post(`http://localhost:5000/api/users`, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailAddress: this.state.emailAddress,
        password:this.state.password,
        isSignedIn: true
      }).then(() => {
        this.props.history.push('/courses');
       
      }).catch(err => {
        console.log(err)
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  cancelSignUp = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };

  render(){
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit = {this.onSubmit}>

              <div>
                <input id="firstName" name="firstName" type="text" placeholder="First Name" onChange={this.handleChange}/>
              </div>
              <div>
                <input id="lastName" name="lastName" type="text" placeholder="Last Name" onChange={this.handleChange}/>
              </div>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={this.handleChange}/>
              </div>
              <div>
                <input id="password" name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
              </div>
              <div>
                <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.handleChange}/>
              </div>

              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={this.cancelSignUp}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <NavLink to='/signin'>Click here</NavLink> to sign in!</p>
        </div>
      </div>
    );
  };
};




              
            
