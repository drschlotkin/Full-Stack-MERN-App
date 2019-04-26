/* CONTEXT API COMPONENT
========================
(1) This component is used for managing global state of currently signed in user
(2) Made available throughout application using <Consumer> components. */



import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';


// Reducer to apply user to global state
const reducer = (state, action) => { 
  const { firstName, lastName, emailAddress, password, ID } = action.payload;
  switch (action.type) {
    case 'SIGN_IN':
      return { firstName, lastName, emailAddress, password, ID, signedIn: true };
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
    errors: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };
  
  componentDidMount = () => {
    console.log('yo')
  }


  // Clear state if user logs out
  signOut = () => {
    this.setState({
      ID: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      signedIn: false
    });
    localStorage.clear()
    this.props.history.push("/");
  };

  
  // Redirect to main page if signOut is cancelled
  cancelSignOut = () => {
    this.props.history.push("/");
  };


  // /* USER GET ROUTE
  // ==================
  // Assign logged in user to state  */
  
  signIn = (user) => {
    const { emailAddress, password } = user;
    axios.get(`http://localhost:5000/api/users`, {
      auth: { username: emailAddress, password }
      }).then(res => {
        const { ID, firstName, lastName, emailAddress } = res.data;
        this.setState({ ID, firstName, lastName, emailAddress, password, signedIn: true })
        
        localStorage.setItem('user', JSON.stringify(this.state))
        
        this.props.history.push("/");
      }).catch(err => {
        if (err.response.status === 401){
          let errors = []
          errors.push('Incorrect username and/or password')
          this.setState({ errors })
        } 
    });
  };



  // Provide state and actions to forms
  render(){
    return (
      <AuthContext.Provider value = {{
        user: this.state,
        actions: {
          signIn: this.signIn,
          signOut: this.signOut,
          cancelSignOut: this.cancelSignOut,
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

