import React from 'react';
import $ from 'jquery';
import { BrowserRouter as Route, Link } from 'react-router-dom';


function toggleClass() {
  let navbar = $('.nav-bar');
  if (navbar.hasClass('responsive')) {
    navbar.removeClass('responsive');
  } else {
    navbar.addClass('responsive');
  }
}

const NavBar = props => {

  let links = {
    'signup': 'Sign Up',
    'login' : 'Log In',
    'logout': 'Log Out',
    '' : 'Home'
  }

  // $(document).ready(function(){                    
  //   $(window).scroll(function(){                          
  //       if ($(window).scrollTop() > 3) {
  //         console.log('greater')
  //         $('.nav-bar').addClass('solid')
  //       } else {
  //         $('.nav-bar').removeClass('solid')
  //       }
  //   });
  // });

  let adds = props.additions;
  let className = "nav-bar cf";
  if (true) {
    //if not landing page
    className += " solid-always";
  }

  // let adds = ['signup', 'login', 'logout']
  let els = [];
  if (adds) {
    for (let i = adds.length - 1; i >= 0; i--) {
      let add = adds[i];
      if (add === 'logout') {
        els.push(<a key={i} className="nav-topic" href={"/logout"}> {links[add]} </a>)
      } else {
        els.push(<Link key={i} className="nav-topic" to={`/${add}`}> {links[add]} </Link>)
      }
    }
  }

  return (
  <div className={className} id="bob"> 
    <a className="nav-topic left" href="#"> Coursa </a>
    <a href="javascript:void(0);" className="icon nav-topic" onClick={toggleClass} >&#9776;</a>
    {els}
  </div>
)}

export default NavBar;