import React from 'react';
import $ from 'jquery';


function toggleClass() {
  let navbar = $('.nav-bar');
  if (navbar.hasClass('responsive')) {
    navbar.removeClass('responsive');
  } else {
    navbar.addClass('responsive');
  }
}

const NavBar = () => {
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

  return (
  <div className="nav-bar cf" id="bob"> 
    <a className="nav-topic"href="#"> Coursa </a>
    <a className="nav-topic"href="#"> About </a>
    <a className="nav-topic" href="#"> Our Products </a>
    <a className="nav-topic" href="#"> Contact Us </a>
    <a className="nav-topic" href="#"> Log In </a>
    <a href="javascript:void(0);" className="icon nav-topic" onClick={toggleClass} >&#9776;</a>
  </div>
)}

export default NavBar;