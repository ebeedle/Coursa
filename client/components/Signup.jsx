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

  isNumberValid(number) {
    if (number.length > 12) {
      return false;
    } else if (isNaN(+number[0])) {
      return false;
    } else {
      return true;
    }
  }

  modifyNumberIfNecessary(number) {
    //if entry not a number
    if (number.length === 3 || number.length === 7) {
      number = number += '-';
    }

    return number;
  }

  handleInputChange(event) {
    console.log('this.state.password :', this.state.password);
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('name :', name, 'value :', value);
    const isDeletion = value.length < this.state.number.length;
    if (name === 'number' && !isDeletion) {
      if (!this.isNumberValid(value)) {
        return false;
      } else {
        value = this.modifyNumberIfNecessary(value);
      }
    }
    console.log('num :', this.state.number.replace(/-/g, ''))
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // alert('Your favorite flavor is: ' + this.state.value);
    //make post request to /login
    //if authenticated
    
    event.preventDefault();
    if (this.state.number.length !== 12) {
      alert('Your phone number must be 10 digits long')
      return false;
    }


    alert('signing up')
    $.post('/signup', {
      username: this.state.username,
      password: this.state.password,
      number: this.state.number.replace(/-/g, '') 
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
              type={"text"}
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