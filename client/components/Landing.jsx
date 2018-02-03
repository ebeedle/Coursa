import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import Heading from './Heading.jsx';

const Landing = () => {
  console.log('tryig to render routes ');
  return (
    <div>
      <Heading />
      <div className="homeBody"> 
        Please <Link to='/signup'>Sign Up</Link> or <Link to='/login'>Login</Link> to track UC Berkeley classes and get a text when your classs opens up .
      </div>
    </div>
  )
}

export default Landing;