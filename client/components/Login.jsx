import React from 'react';
import Heading from './Heading.jsx';
import NavBar from './NavBar.jsx';
import SingleInput from './SingleInput.jsx';
import $ from 'jquery'
import { BrowserRouter as Route, Redirect} from 'react-router-dom'


class Login extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
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
    console.log('trying to log in')
    event.preventDefault();
    $.post('/login', { username: this.state.username, password: this.state.password })
    .done(() => {
      //redirect to home component
      this.setState({redirect: true}) 
    })
    .fail(e => {
      console.log('fail')
      alert('error try again :', e)
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <NavBar additions={['', 'signup']}/>
        <div className="container padding-top">
          <div className="sign_up"> 
            Log In
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
            <button type="submit" className="btn btn-default"> Submit </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;