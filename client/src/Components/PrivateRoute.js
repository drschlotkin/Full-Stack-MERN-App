/* HIGHER-ORDER COMPONENT FOR PROTECTED ROUTES
==============================================
(1) Redirect to sign in page if user attempts to create or update course 
(2) Using local storage, redirect back to page that user attempted to access */



import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthContext} from './Context/index';

const PrivateRoute = ({ component: Component, ...rest}) => { 
  const pathname = {...rest.location}.pathname
  const courseID = pathname.slice(9, 33)
  const context = useContext(AuthContext);
  let localUser = null;
  let newPath = '';

  localStorage.setItem('location', JSON.stringify(pathname))
  
  if(localStorage.getItem('user')){
    const { signedIn } = JSON.parse(localStorage.getItem('user'));
    localUser = signedIn;
  }; 

  if (!context.user.signedIn && !localUser){
    if (pathname === '/courses/create') newPath = '/signin';
    if (pathname === `/courses/${courseID}/update`) newPath = '/forbidden';
  }else{
    if (pathname === '/courses/create') newPath = '/courses/create';
    if (pathname === `/courses/${courseID}/update`) newPath = `/courses/${courseID}/update`;
  };

  return <Route {...rest} render = {props => (
    context.user.signedIn
      ? <Component {...props} />
      : <Redirect to = {newPath} />
  )} />
}

export default PrivateRoute;

