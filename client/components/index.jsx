 import React from 'react';
 import ReactDom from 'react-dom';
 import { BrowserRouter } from 'react-router-dom';
 // import Home from './app.jsx';
 import Routes from './Routes.jsx';





  
 ReactDom.render((
  <BrowserRouter> 
    <Routes />
  </BrowserRouter>),
  document.getElementById('app')
 )