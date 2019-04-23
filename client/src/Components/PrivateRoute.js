/* HIGHER-ORDER COMPONENT
=========================
Redirect to sign in page if user attempts to create course or view course details */



import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthContext} from './Context/index';
  
const PrivateRoute = ({ component: Component, ...rest}) => { 
  const context = useContext(AuthContext);
  return <Route {...rest} render = {props => (
    context.user.signedIn
      ? <Component {...props} />
      : <Redirect to = '/signin' />

  )} />
}

  export default PrivateRoute;
