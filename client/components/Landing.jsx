import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import Heading from './Heading.jsx';
import NavBar from './NavBar.jsx';

const Landing = () => {
  console.log('tryig to render routes ');
  /*
      <div className="t1 row-part par-vert-cent" id="about">
          <div className="taint center medium pad"> About </div>
          <div className="taint center sm">
            Coursa is the best way to get notified when your UC Berkeley course opens up.
            Just sign up, track the course you're intersted in, and we'll text
            you when your course changes its status to open or waitlist.
          </div>
      </div>
      <div className="t2 row-part par-vert-cent" id="contact">
        <div className="black center medium pad"> Meet the Creator of Coursa </div>
        <div className="center">
          <img src={"/images/creator.jpg"} width="100px" className="creator"/>
        </div>
        <div className="center"> Bill Beedle </div>
      </div>

      <div className="t2"> </div>

*/

  /*<div className="homeBody wide-row"> 
        Please <Link to='/signup'>Sign Up</Link> or <Link to='/login'>Login</Link> to track UC Berkeley classes and get a text when your classs opens up .
      </div> */
  return (
    <div>
      <div className="berkely-pic">
        <div className="cover">
          <NavBar additions={['login', 'signup']}/>
          <div className="landing-container">
            <div className="cf intro">
              <div>
              <div className="large center white"> Coursa </div>
              <div className="white center"> Get a text when your UC Berkeley class opens up </div>
              <div className="home-buttons cf">
                <div className="landing-button">
                  <Link to="/signup">
                    <button className="btn btn-primary btn-lg"> Signup </button>
                  </Link>
                </div>
                <div className="landing-button">
                <Link to="/login">
                  <button className="btn btn-primary btn-lg"> Login </button>
                </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Landing;