import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Consumer} from './Context'
import axios from 'axios';

export default class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: ''
  }

  onSubmit = (event) => {
    event.preventDefault();
    
    axios.get(`http://localhost:5000/api/users`, {
      auth: {
        username: this.state.emailAddress,
        password: this.state.password
      }
    }).then(res => {
      this.props.history.push('/courses');
      <Consumer>
        {value => {
          const { logIn} = value
          logIn(res.data.emailAddress)
        }}
      </Consumer>
      
    }).catch(err => {
      console.log('unsuccessful')
      console.log(err)
    });
   
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

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
            <form onSubmit = {this.onSubmit}>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleChange} />
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleChange} />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={this.cancelSignIn}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <NavLink to='/signup'>Click here</NavLink> to sign up!</p>
        </div>
      </div>
    );
  };
};

