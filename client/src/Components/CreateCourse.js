import React, {Component} from 'react';
import {Consumer} from './Context';
import {Redirect} from 'react-router-dom';


/* CREATE COURSE FORM
=====================
Display form if User is logged in. Redirect to signin if User is not logged in */


export default class CreateCourse extends Component {
  
  render(){
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>

        <Consumer>
          {({actions, signedIn, user}) => (
            <React.Fragment>

            {user.errors.length > 0 ?    
              <div>
              <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                  <ul>
                  {Object.keys(user.errors).map((key, i) => {
                    return (
                    <li key={key}>{user.errors[i]}</li>
                    )
                  })}
                  </ul>
                </div>
              </div>
                : null
            }
            
              {signedIn ? 
                <form onSubmit = {actions.courseValidation}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                      <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={actions.stateData}/>
                      </div>
                      <p>By {user.firstName}</p>
                    </div>
                    <div className="course--description">
                      <div>
                        <textarea id="description" name="description" className="" placeholder="Course description..." onChange={actions.stateData}></textarea>
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
                              placeholder="Hours" onChange={actions.stateData}/>
                          </div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={actions.stateData}></textarea>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={actions.cancel}>Cancel</button>
                  </div>
                </form>
              : 
                <Redirect to='/signin' /> 
              }
            </React.Fragment>
          )}
        </Consumer>
      </div> 
    );
  };
};



