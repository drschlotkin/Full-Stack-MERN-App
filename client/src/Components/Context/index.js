/* CONTEXT API COMPONENT
========================
(1) This component is used for managing global state of signed in user
(2) Made available throughout application using <Consumer> components. */



import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';


// Reducer to apply user data to global state
const reducer = (state, action) => { 
  const { firstName, lastName, emailAddress, password, ID, signedIn } = action.payload;
  switch (action.type) {
    case 'SIGN_IN':
      return { firstName, lastName, emailAddress, password, ID, signedIn };
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
    if(localStorage.getItem('user')){
      const {ID, firstName, lastName, emailAddress, signedIn, password} = JSON.parse(localStorage.getItem('user'));
      this.setState({ID, firstName, lastName, emailAddress, signedIn, password }); 
    };
  };


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
  // Save logged in user to state and to local storage. Redirect back to previous page */
  
  signIn = (user) => {
    const { emailAddress, password } = user;
    axios.get(`http://localhost:5000/api/users`, {
      auth: { username: emailAddress, password }
      }).then(res => {
        const { ID, firstName, lastName, emailAddress } = res.data;
        this.setState({ ID, firstName, lastName, emailAddress, password, signedIn: true })
        if(localStorage.getItem('location')){
          const location = JSON.parse(localStorage.getItem('location'))
          this.props.history.push(`${location}`);
        }else{
          this.props.history.push('/');
        }
        localStorage.clear()
        localStorage.setItem('user', JSON.stringify(this.state))    
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