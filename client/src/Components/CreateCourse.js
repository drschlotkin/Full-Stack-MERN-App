/* CREATE COURSE FORM
=====================
Only available if user is logged in */



import React, { Component } from 'react';
import { Consumer } from './Context';
import axios from 'axios';

export default class CreateCourse extends Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  };


  /* CREATE COURSE VALIDATION
  ==========================
  Validate all inputs before proceeding to POST route*/

  validation = (user, event) => {
    event.preventDefault();
    let errors = [];
    let {title, description} = this.state;
    title.length === 0 && errors.push('Please enter a title for your course');
    description.length === 0 && errors.push('Please enter a description for your course');
    this.setState({ errors });
    errors.length === 0 && this.createCourse(user);
  };


 /* COURSE POST ROUTE
  ==================
  Save course and the associated user information to database  */

  createCourse = (user) => {
    const { title, description, estimatedTime, materialsNeeded } = this.state
    const history = this.props.history
    axios({
      method: 'post',
      auth: {
        username: user.emailAddress,
        password: user.password
      },
      url: `http://localhost:5000/api/courses`,
      data: { title, description, estimatedTime, materialsNeeded }
      }).then(() => {
        history.push('/courses');
      }).catch(err => {
        if (err) history.push('/error')
    });
  };


  // Assign each state value from input fields
  stateData = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  // Cancel form event
  cancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };
  

  /* RENDER ELEMENTS TO DOM
  ========================= */
  render(){
    const { errors } = this.state
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>

        <Consumer>
          {({user}) => {
            return(
              <React.Fragment>
                {errors.length > 0 ?    
                  <div>
                    <h2 className="validation--errors--label">Error!</h2>
                      <div className="validation-errors">
                        <ul>
                          {Object.keys(errors).map((key, i) => {
                            return (
                              <li key={key}>{errors[i]}</li>
                            )
                          })}
                        </ul>
                      </div>
                  </div>
                : null
                }

                <form onSubmit = {this.validation.bind(this, user)}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                        <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.stateData}/>
                      </div>
                      <p>By {user.firstName} {user.lastName}</p>
                    </div>
                    <div className="course--description">
                      <div>
                        <textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.stateData}></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div>
                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                              placeholder="Hours" onChange={this.stateData}/>
                          </div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.stateData}></textarea>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                  </div>
                </form>
              </React.Fragment>
            )
          }}
        </Consumer>
        
      </div> 
    );
  };
};



