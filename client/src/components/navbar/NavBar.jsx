import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
    const {isAuthenticated,loginWithRedirect,logout,user} = useAuth0();
  
    return (
      <div className="navbar">
        <div className="leftnavbar">
          <Link to="/" className="logo">
            <img src="./logo.png" alt="website logo" />
            <span>Yummy Search</span>
          </Link>
          <Link className="navItems" id="homebutton" to="/">
            Home
          </Link>
        </div>
  
        <div className="rightnavbar">
          {isAuthenticated ? (
            
            <div className="user">
              
              <span>{user.name}</span>
              <Link className='debugger' to = "/debugger">AuthDebugger</Link>
              <Link className="navButton navItems" to="/profile">
                Profile
              </Link>
              <button className="navButton navItems" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className="navButton navItems" id="login" onClick={() => loginWithRedirect()}>
                Login
              </button>
    
            </>
          )}

        </div>
      </div>
    );
  }
  
  export default NavBar;