/* CONTEXT API COMPONENT
========================
(1) This component is used for managing global state of currently signed in user
(2) Made available throughout application using <Consumer> components. */



import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';


// Set user returned from {UserSignUp} or {UserSignIn} to global state
const reducer = (state, action) => { 
  const {firstName, lastName, userName, password, ID} = {...action.payload}
  switch (action.type) {
    case 'SIGN_IN':
      return { firstName, lastName, emailAddress: userName, password, ID, signedIn: true };
    default:
      return state;
  }; 
};

class Provider extends Component {

  // Set initial state 
  state = {
    firstName: '',
    lastName:'',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    signedIn: false,
    ID: '',
    dispatch: action => this.setState(state => reducer(state, action))
  };
  

  // Clear state if user logs out
  logOut = () => {
    this.setState({
      ID: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      signedIn: false
    });
    this.props.history.push("/");
  };


  // Redirect to main page if logout action is cancelled
  cancel = () => {
    this.props.history.push("/");
  };


  // Delete course if user is authenticated
  deleteCourse = () => {
    axios.delete(`http://localhost:5000/api/${window.location.pathname}`, {
      auth: {
        username: this.state.emailAddress,
        password: this.state.password
      }
    }).then(() => {
      this.props.history.push('/courses');
    }).catch(err => {
      console.log(err.response.status)
    });
  };


  // Provide state and actions to forms
  render(){
    return (
      <AuthContext.Provider value = {{
        user: {...this.state},
        actions: {
          logOut: this.logOut,
          deleteCourse: this.deleteCourse,
          cancel: this.cancel
        }
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  };
};

export default withRouter(Provider);
export const AuthContext = React.createContext();
export const Consumer = AuthContext.Consumer;

