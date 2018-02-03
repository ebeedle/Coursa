import React from 'react';
import Heading from './Heading.jsx';
import SingleInput from './SingleInput.jsx';

class Login extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      username: '',
      password: '',
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

  render() {
    return (
      <div>
        <Heading />
        <div className="container">
          <div className="sign_up"> 
            Log In
          </div>
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
        </div>
      </div>
    )
  }
}

export default Login;