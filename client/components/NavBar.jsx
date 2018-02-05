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
/*  <a className="nav-topic"href="#about"> About </a>
    <a className="nav-topic" href="#"> Our Products </a>
    <a className="nav-topic" href="#contact"> Contact Us </a>
*/

  let links = {
    'signup': 'Sign Up',
    'login' : 'Log In',
    'logout': 'Log Out',
    '' : 'Home'
  }

  $(document).ready(function(){                    
    $(window).scroll(function(){                          
        if ($(window).scrollTop() > 3) {
          console.log('greater')
          $('.nav-bar').addClass('solid')
        } else {
          $('.nav-bar').removeClass('solid')
        }
    });
  });

  let adds = props.additions;
  let className = "nav-bar cf";
  if (true) {
    //if not landing page
    className += " solid-always";
  }

  // let adds = ['signup', 'login', 'logout']
  let els = [];
  if (adds) {
    for (let i = 0; i < adds.length; i++) {
      let add = adds[i];
      if (add === 'logout') {
        els.push(<a className="nav-topic" href={"http://localhost:3000/logout"}> {links[add]} </a>)
      } else {
        els.push(<Link to={`/${add}`}> <a className="nav-topic" href="#"> {links[add]} </a> </Link>)
      }
    }
  }

  // console.log('els :', els)

  //if solid always === true
    //add solid always class

  //login signup
  //signup
  //logout
  
  return (
  <div className={className} id="bob"> 
    <a className="nav-topic"href="/"> Coursa </a>
    <a href="javascript:void(0);" className="icon nav-topic" onClick={toggleClass} >&#9776;</a>
    {els}
  </div>
)}

export default NavBar;