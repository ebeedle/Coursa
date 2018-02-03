import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './app.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Landing from './Landing.jsx';

const Routes = () => {
  console.log('tryig to render routes ');
  return (
    <div>
    <Router>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
    </div>
  )
}

export default Routes;