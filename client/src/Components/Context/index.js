import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
// import {BrowserRouter} from 'react-router-dom';

const AuthContext = React.createContext();

export class Provider extends Component {

  state = {
    firstName: null,
    lastName:null,
    emailAddress: null,
    password: null,
    signedIn: false,
  }

  logIn = (event) => {
    event.preventDefault();
    console.log(this.state.firstName)
    console.log(this.state.signedIn)
    axios.get(`http://localhost:5000/api/users`, {
      auth: {
        username: this.state.emailAddress,
        password: this.state.password
      }
    }).then(res => {
      this.setState({
        firstName: res.data.firstName,
        signedIn: true
      })
      // this.props.history.push('/courses');
      console.log('successful')
    }).catch(err => {
      console.log('unsuccessful')
      console.log(err)
    });
  }


  logOut = () => {
    this.setState({ 
      firstName: null,
      signedIn: false
    })
  }


  userData = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render(){
    return (
      
      <AuthContext.Provider value = {{
        firstName: this.state.firstName,
        signedIn: this.state.signedIn,
        actions: {
          signedIn: this.state.signedIn,
          logIn: this.logIn,
          logOut: this.logOut,
          userData: this.userData
        }
      }}>
        {this.props.children}
      </AuthContext.Provider>
      
    )
  }
}



// export default withRouter(Provider)
export const Consumer = AuthContext.Consumer

