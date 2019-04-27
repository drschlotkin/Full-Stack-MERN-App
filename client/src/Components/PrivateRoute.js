/* HIGHER-ORDER COMPONENT FOR PROTECTED ROUTES
==============================================
(1) Redirect to sign in page if user attempts to create or update course 
(2) Using local storage, redirect back to page that user attempted to access */



import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthContext} from './Context/index';
  
const PrivateRoute = ({ component: Component, ...rest}) => { 
  localStorage.setItem('location', JSON.stringify({...rest.location}.pathname))
  const context = useContext(AuthContext);
  return <Route {...rest} render = {props => (
    context.user.signedIn
      ? <Component {...props} />
      : <Redirect to = '/signin' />
  )} />
}

export default PrivateRoute;
  