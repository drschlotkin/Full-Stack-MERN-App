/* UPDATE COURSE COMPONENT
==========================
(1) Only available if user is authenticated 
(2) Display course details
(3) Show validation errors if necessary before updating to database */



import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from './Context';

export default class UpdateCourse extends Component {
  
  state = {
    user: [],
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  };

  
  componentDidMount(){
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(res => {
        const {user, title, description, estimatedTime, materialsNeeded} = {...res.data};
        this.setState({
          user,
          title,
          description,
          estimatedTime,
          materialsNeeded
        });
      }).catch(err => {
        console.log(err);
    });
  };


   /* UPDATE COURSE VALIDATION
  ==========================
  Validate all inputs before proceeding to PUT route*/

  validation = (user, event) => {
    event.preventDefault();
    
    let errors = [];
    let { title, description } = { ...this.state };
    
    if (title.length === 0) errors.push('Please enter a Title');
    
    if (description.length === 0) errors.push('Please enter a Description');
    
    this.setState({ errors: errors });

    if (errors.length === 0) this.updateCourse(user);
  };


 /* COURSE PUT ROUTE
  ==================
  Update course in database */

  updateCourse = (user) => {
    const { title, description, estimatedTime, materialsNeeded } = { ...this.state }
    axios({
      method: 'put',
      auth: {
        username: user.emailAddress,
        password: user.password
      },
      url: `http://localhost:5000/api/courses/${this.props.match.params.id}`,
      data: { 
        title, 
        description, 
        estimatedTime, 
        materialsNeeded 
      }}).then(() => {
        this.props.history.push(`/courses/${this.props.match.params.id}`);
      }).catch(err => {
        console.log(err);
    }); 
  };


  // Cancel form event
  cancelUpdate = (event) => {
    event.preventDefault();
    this.props.history.push(`/courses/${this.props.match.params.id}`);
  };


  // Assign each state value from input fields
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  
  
  render(){
    const { errors } = {...this.state}
    const { title, description, estimatedTime, materialsNeeded } = { ...this.state }
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>

        <Consumer>
          {({user}) => {         
            return (
              <React.Fragment>
                {errors.length > 0 ?    
                  <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
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

                <div>
                    <form onSubmit={this.validation.bind(this, user)}>
                    <div className="grid-66">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                          <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={`${title}`} onChange={this.handleChange}/>
                        </div>
                        <p>By {user.firstName} {user.lastName}</p>
                      </div>

                      <div className="course--description">
                        <div>
                          <textarea id="description" name="description" value={description} onChange={this.handleChange} placeholder="Course description..."></textarea>
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
                                placeholder="Hours" value={`${estimatedTime}`} onChange={this.handleChange} />
                            </div>
                          </li>
                          <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div>
                              <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={this.handleChange} placeholder="List materials..."></textarea>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit">Update Course</button>
                      <button className="button button-secondary" onClick={this.cancelUpdate}>Cancel</button>
                    </div>
                  </form>
                </div>
              </React.Fragment>
            )
          }}
        </Consumer>
            
      </div>
    );
  };
};