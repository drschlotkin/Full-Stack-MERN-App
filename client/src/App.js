import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Provider from './Components/Context';
import Header from './Components/Header';
import Courses from './Components/Courses';
import CreateCourse from './Components/CreateCourse';
import CourseDetail from './Components/CourseDetail';
import UpdateCourse from './Components/UpdateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import PageNotFound from './Components/PageNotFound';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider>
            <Header />
            <Switch>
              <Route exact path='/courses' render={() =>  <Redirect to='/' />}/>   
              <Route exact path='/' component={Courses} />
              <Route path='/courses/create' component={CreateCourse} />
              <Route exact path='/courses/:id' component={CourseDetail} />
              <Route path='/courses/:id/update' component={UpdateCourse} />
              <Route path='/signin' component={UserSignIn} />
              <Route path='/signup' component={UserSignUp} />
              <Route path='/signout' component={UserSignOut} />
              <Route component = {PageNotFound} />
            </Switch>
        </Provider>
      </BrowserRouter>
    );
  };
};

