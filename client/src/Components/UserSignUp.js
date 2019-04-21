import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Consumer} from './Context';


export default class UserSignUp extends Component {

  render(){
    
    return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1 className="append">Sign Up</h1>
        <Consumer>
          {value => {
            const {actions, user} = value
            return (
              <React.Fragment>
                {user.errors.length > 0  ?    
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

              <form onSubmit = {actions.signupValidation}>
                <div>
                  <input id="firstName" name="firstName" type="text" placeholder="First Name" onChange={actions.stateData}/>
                </div>
                <div>
                  <input id="lastName" name="lastName" type="text" placeholder="Last Name" onChange={actions.stateData}/>
                </div>
                <div>
                  <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={actions.stateData}/>
                </div>
                <div>
                  <input id="password" name="password" type="password" placeholder="Password" onChange={actions.stateData}/>
                </div>
                <div>
                  <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={actions.stateData}/>
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Sign Up</button>
                  <button className="button button-secondary" onClick={actions.cancel}>Cancel</button>
                </div>
              </form>

              <p>Already have a user account? <NavLink to='/signin'>Click here</NavLink> to sign in!</p>
              </React.Fragment>
            )
          }}
        </Consumer>
        </div>
        
      </div>
   
    );
  };
};

// state = {
//   firstName: '',
//   lastName: '',
//   emailAddress: '',
//   password: '',
//   confirmPassword: '',
//   isSignedIn: false,
//   errors: []
// };



// logIn = () => {
//   axios.post(`http://localhost:5000/api/users`, {
//     firstName: this.state.firstName,
//     lastName: this.state.lastName,
//     emailAddress: this.state.emailAddress,
//     password:this.state.password,
//     isSignedIn: true
//   }).then(() => {
//     this.props.history.push('/courses');
//   }).catch(err => {
//     console.log(err.response.status)
//   });
// }; 



// validation = (event) => {
  //   event.preventDefault();
  //   let errors = []
  //   const {firstName, lastName, emailAddress, password, confirmPassword} = {...this.state}

  //   if(firstName.length === 0) errors.push('Please provide a value for First Name');
  //   if(lastName.length === 0) errors.push('Please provide a value for Last Name');

  //   if(password.length === 0){
  //     errors.push('Please provide a value for Password');
  //   }else if(password !== confirmPassword){
  //     errors.push('Passwords do not match');
  //   };

  //   if(emailAddress.length === 0) {
  //     errors.push('Please provide a value for Email Address');
  //   }else if(!emailRegex.test(emailAddress)){
  //     errors.push('Invalid email address');
  //   };

  //   this.setState({errors: errors})

  //   if(errors.length === 0) this.logIn()
  // }

  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  // cancelSignUp = (event) => {
  //   event.preventDefault();
  //   this.props.history.push("/");
  // };
              
            
