import React, {Component} from 'react';

export default class UserSignIn extends Component {

  CancelSignIn = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };

  render(){
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" />
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" value="" />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={this.CancelSignIn}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <NavLink to='/signup'>Click here</NavLink> to sign up!</p>
        </div>
      </div>
    )
  }
}

