import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
// import auth from './auth';

const AuthContext = React.createContext();


const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const initialState = {
  firstName: '',
  lastName:'',
  emailAddress: '',
  password: '',
  confirmPassword: '',
  signedIn: false,
  title: '',
  description: '',
  estimatedTime: '',
  materialsNeeded: '',
  ID: '',
  errors: [],
  signInErrors: false,
  signUpErrors: false
};

class Provider extends Component {

  // Set initial state 
  state = initialState;

  

  // Assign each state value from input fields
  stateData = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  // Reset state to default
  logOut = () => {
    this.setState(initialState);
    this.props.history.push("/");
  };


  // Set user state if log in is successful
  logIn = () => {
    axios.get(`http://localhost:5000/api/users`, {
      auth: {
        username: this.state.emailAddress,
        password: this.state.password
      }
    }).then(res => {
      this.setState({
        ID: res.data.ID,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        emailAddress: res.data.userName,
        signedIn: true
      })
      this.props.history.push("/");
    }).catch(err => {
      console.log(err);
    });
  };


  // Cancel form event
  cancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };

  
  // USER SIGN UP VALIDATION

  signupValidation = (event) => {
    event.preventDefault();
    let errors = []
    const {firstName, lastName, emailAddress, password, confirmPassword} = {...this.state}
    
    if(firstName.length === 0) errors.push('Please provide a value for First Name');
    if(lastName.length === 0) errors.push('Please provide a value for Last Name');

    if(password.length === 0){
      errors.push('Please provide a value for Password');
    }else if(password !== confirmPassword){
      errors.push('Passwords do not match');
    };

    if(emailAddress.length === 0) {
      errors.push('Please provide a value for Email Address');
    }else if(!emailRegex.test(emailAddress)){
      errors.push('Invalid email address');
    };
    
    this.setState({
      errors: errors,
      signUpErrors: true,
      signInErrors: false
    })

    if(errors.length === 0) this.signup()
  }


  signinValidation = (event) => {
    event.preventDefault();
    
    let errors = []
    const {emailAddress, password} = {...this.state}

    if(password.length === 0){
      errors.push('Please provide a value for Password');
    };

    if(emailAddress.length === 0) {
      errors.push('Please provide a value for Email Address');
    }else if(!emailRegex.test(emailAddress)){
      errors.push('Invalid email address');
    };

    this.setState({
      errors: errors,
      signInErrors: true,
      signUpErrors: false
    })

    if(errors.length === 0) this.logIn()
  }

  signup = () => {
    axios.post(`http://localhost:5000/api/users`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      password:this.state.password,
      isSignedIn: true
    }).then(() => {
      this.logIn()
      
    }).catch(err => {
      console.log(err.response.status)
    });
  }; 



  // Validation for Create Course fields
  courseValidation = (event) => {
    event.preventDefault();
    // auth.course();
    let errors = [];
    let {title, description} = {...this.state};
    
    if(title.length === 0) errors.push('Please provide a value for Title');
    
    if(description.length === 0) errors.push('Please provide a value for Description');
    
    this.setState({
      errors: errors
    });

    // If there are no validation errors, call this.createCourse()
    if(errors.length === 0) this.createCourse();
  };


  // Save course to database if user is logged in
  createCourse = () => {
    axios({
      method: 'post',
      auth: {
        username: this.state.emailAddress,
        password: this.state.password
      },
      url: `http://localhost:5000/api/courses`,
      data: {
        title: this.state.title,
        description: this.state.description,
        estimatedTime: this.state.estimatedTime,
        materialsNeeded:this.state.materialsNeeded,
      }
      }).then(() => {
        this.props.history.push('/courses');
      }).catch(err => {
        console.log(err)
      });
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
        signedIn: this.state.signedIn,
        actions: {
          cancel: this.cancel,
          logIn: this.logIn,
          logOut: this.logOut,
          stateData: this.stateData,
          courseValidation: this.courseValidation,
          signupValidation: this.signupValidation,
          signinValidation: this.signinValidation,
          deleteCourse: this.deleteCourse
        }
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  };
};

export default withRouter(Provider);
export const Consumer = AuthContext.Consumer;

