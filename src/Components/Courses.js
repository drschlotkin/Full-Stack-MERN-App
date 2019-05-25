/* COURSES COMPONENT (Main Page)
================================
(1) Render list of courses from database
(2) User can create courses and update/delete only if they're logged in */



import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class Courses extends Component {
  
  state = {
    courses: []
  };
  

  componentDidMount(){
    localStorage.setItem('location', JSON.stringify(window.location.pathname));
    const history = this.props.history;
    axios.get(`api/courses`)
      .then(res => {
        this.setState({ courses: res.data });
      }).catch(err => {
        if (err) history.push('/error')
      });
  };


  /* RENDER ELEMENTS TO DOM
  ========================= */
  render(){
    return (
      <div className="bounds">
      
        {this.state.courses.map(course =>
          <div className="grid-33" key={course._id}>
            <NavLink to={`/courses/${course._id}`} className="course--module course--link">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </NavLink>
          </div>
        )}
        
        <div className="grid-33">
          <NavLink to='/courses/create' className="course--module course--add--module">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course      
            </h3>
          </NavLink>
        </div>
      </div>
    );
  };
};
