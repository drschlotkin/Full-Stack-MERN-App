import React, { Component } from 'react';

const AuthenticationContext = React.createContext();

export class Provider extends Component {

  state = {
    signedIn: false,
    firstName: ''
  }

  render(){
    return (
      <AuthenticationContext.Provider value = {{
        signedIn: this.state.signedIn,
        name: this.state.firstName
      }}>
        {this.props.children}
      </AuthenticationContext.Provider>
    )
  }
}

export const Consumer = AuthenticationContext.Consumer