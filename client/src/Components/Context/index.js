import React, { Component } from 'react';

const AuthenticationContext = React.createContext();

export class Provider extends Component {

  state = {
    signedIn: false,
    firstName: null
  }

  logIn = name => {
    this.setState({ 
      firstName: name,
      signIn: true
    })
  }

  logOut = () => {
    this.setState({ 
      firstName: null,
      signedIn: false
    })
  }

  render(){
    return (
      <AuthenticationContext.Provider value = {{
        firstName: this.state.firstName,
        signedIn: this.state.signedIn,
        logIn: this.logIn,
        logOut: this.logOut
      }}>
        {this.props.children}
      </AuthenticationContext.Provider>
    )
  }
}

export const Consumer = AuthenticationContext.Consumer