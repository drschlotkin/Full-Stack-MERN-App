import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Header from './Components/Header';
import Courses from './Components/Courses';
import CreateCourse from './Components/CreateCourse';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import PageNotFound from './Components/PageNotFound';



export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path='/courses' render={() =>  <Redirect to='/' />}/>   
            <Route exact path='/' component={Courses} />
            <Route path='/courses/create' component={CreateCourse} />
            <Route path='/courses/:id' component={CourseDetail} />
            <Route path='/signin' component={UserSignIn} />
            <Route path='/signup' component={UserSignUp} />
            <Route component = {PageNotFound} />
          </Switch>
      </BrowserRouter>
    );
  }
}

