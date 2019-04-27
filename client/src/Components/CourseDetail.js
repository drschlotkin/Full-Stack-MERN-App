/* COURSE DETAIL COMPONENT
==========================
(1) Show selected course details
(2) Update and Delete are only available to authorized user(s) */



import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context'


export default class CourseDetail extends Component {
  
  state = {
    course: '',
    user: '',
    userID: ''
  };

  componentDidMount(){
    const history = this.props.history
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          course: res.data,
          user: res.data.user,
          userID: res.data.user._id
        });
      }).catch(err => {
        err.response.status === 500 ? history.push('/error') : history.push('/notfound');
      });
  };


  deleteCourse = (user) => {
    const history = this.props.history
    axios.delete(`http://localhost:5000/api/${window.location.pathname}`, {
      auth: {
        username: user.emailAddress,
        password: user.password
      }
    }).then(() => {
      history.push('/courses');
    }).catch(err => {
      err.response.status === 500 ? history.push('/error') : history.push('/notfound');
    });
  };


  render(){
    const { _id, title, description, materialsNeeded, estimatedTime } = this.state.course
    const { userID, user } = this.state
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
           
              <Consumer>
                {({user}) => {
                  return (
                    <span>    
                      {user.signedIn && user.ID === userID ?
                        <React.Fragment>
                          <NavLink to={`/courses/${_id}/update`} className="button">Update Course</NavLink>
                          <button className="button" onClick={() => this.deleteCourse(user)} >Delete Course</button>
                        </React.Fragment>
                        : null
                      }
                    </span>
                  )
                }}
              </Consumer>

              <NavLink to='/' className="button button-secondary">Return to List</NavLink>
            </div>
          </div>
        </div>

        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>By {user.firstName} {user.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown>{description}</ReactMarkdown> 
            </div>
          </div>

          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
};