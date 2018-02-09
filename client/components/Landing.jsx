import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import Heading from './Heading.jsx';
import NavBar from './NavBar.jsx';

const Landing = () => {

  return (
    <div>
      <div className="berkely-pic">
        <div className="cover">
          <NavBar additions={['login', 'signup']}/>
          <div className="landing-container">
            <div className="cf intro">
              <div>
              <div className="large center white"> Coursa </div>
              <div className="white center description"> Get a text when your UC Berkeley class opens up </div>
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