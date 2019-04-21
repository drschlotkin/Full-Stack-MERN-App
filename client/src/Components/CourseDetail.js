import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import {Consumer} from './Context'

export default class CourseDetail extends Component {
  
  state = {
    course: [],
    user: [],
    userID: []
  };

  
  componentDidMount(){
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(res => {
       
        this.setState({
          course: res.data,
          user: res.data.user,
          userID: res.data.user._id
        });
      }).catch(err => {
        console.log(err);
      });
  };

  render(){
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
           
              <Consumer>
                {({user, actions}) => (
                  <span>    
                  {user.signedIn && user.ID === this.state.userID ?
                    <React.Fragment>
                      <NavLink to={`/courses/${this.state.course._id}/update`} className="button">Update Course</NavLink>
                      <button className="button" onClick={actions.deleteCourse}>Delete Course</button>
                    </React.Fragment>
                    : null
                  }
                  </span>
                )}
              </Consumer>
              <NavLink to='/' className="button button-secondary">Return to List</NavLink>
              
            </div>
          </div>
        </div>

        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown>{this.state.course.description}</ReactMarkdown> 
            </div>
          </div>

          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkdown>{this.state.course.materialsNeeded}</ReactMarkdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
};