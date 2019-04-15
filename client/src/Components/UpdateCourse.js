import React, {Component} from 'react';
import axios from 'axios';


export default class UpdateCourse extends Component {
  
  state = {
    user: [],
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
  };

  componentDidMount(){
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          user: res.data.user,
          title: res.data.title,
          description: res.data.description,
          estimatedTime: res.data.estimatedTime,
          materialsNeeded: res.data.materialsNeeded,

        });
      }).catch(err => {
        console.log(err);
      });
  };

  cancelUpdate = (event) => {
    event.preventDefault();
    this.props.history.push(`/courses/${this.props.match.params.id}`);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  

  render(){
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={`${this.state.title}`} onChange={this.handleChange}/>
                </div>
                <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
              </div>

              <div className="course--description">
                <div>
                  <textarea id="description" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Course description...">
                   
                  </textarea>
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
                        placeholder="Hours" value={`${this.state.estimatedTime}`} onChange={this.handleChange} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" value={this.state.materialsNeeded} onChange={this.handleChange} placeholder="List materials..."></textarea>
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
      </div>
    );
  };
};