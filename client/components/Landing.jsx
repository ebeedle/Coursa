import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import Heading from './Heading.jsx';
import NavBar from './NavBar.jsx';

const Landing = () => {
  console.log('tryig to render routes ');
  /*<div className="homeBody wide-row"> 
        Please <Link to='/signup'>Sign Up</Link> or <Link to='/login'>Login</Link> to track UC Berkeley classes and get a text when your classs opens up .
      </div> */
  return (
    <div>
      <div className="berkely-pic">
        <div className="cover">
          <NavBar />
          <div className="landing-container">
            <div className="cf intro">
              <div>
              <div className="large center white"> Coursa </div>
              <div className="white center"> Get a text when your UC Berkeley class opens up </div>
              <div className="home-buttons cf">
                <div className="landing-button">
                  <Link to="/signup">
                    <button className="btn btn-primary"> Signup </button>
                  </Link>
                </div>
                <div className="landing-button">
                <Link to="/login">
                  <button className="btn btn-primary"> Login </button>
                </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
      <div> hi </div>
    </div>
  )
}

export default Landing;