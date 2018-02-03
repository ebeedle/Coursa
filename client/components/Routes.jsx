import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './app.jsx';
import Signup from './Signup.jsx';

const Routes = () => {
  console.log('tryig to render routes ');
  return (
    <div>
      <Switch>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>
  )
}

export default Routes;