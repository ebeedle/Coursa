import React from 'react';
import NavBar from './NavBar.jsx';
import SingleInput from './SingleInput.jsx';
import { BrowserRouter as Route, Redirect} from 'react-router-dom'

class Signup extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      number: '',
      redirect: false
    };
  }

  handleInputChange(event) {
    console.log('this.state.password :', this.state.password);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('name :', name, 'value :', value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // alert('Your favorite flavor is: ' + this.state.value);
    //make post request to /login
    //if authenticated

    event.preventDefault();
    $.post('/signup', {
      username: this.state.username,
      password: this.state.password,
      number: this.state.number 
    })
    .done(() => {
      this.setState({redirect: true})
      //redirect to home component
    })
    .fail(e => {
      alert('an error occurred. Please try again. :', e)
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBar additions={['', 'login']}/>
        <div className="container padding-top">
          <div className="sign_up"> 
            Sign Up
          </div>
          <form onSubmit={this.handleSubmit}>
            <SingleInput
              title={"Email Address"}
              name={"username"}
              type={"email"}
              value={this.state.email}
              onChange={this.handleInputChange} />
            <SingleInput
              title={"Password"}
              name={"password"}
              type={"password"}
              value={this.state.password}
              onChange={this.handleInputChange} />
            <SingleInput
              title={"Phone Number"}
              name={"number"}
              type={"number"}
              value={this.state.number}
              placeholder={"No dashes or parentheses!"}
              onChange={this.handleInputChange} />
            <button type="submit" className="btn btn-default"> Submit </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Signup;