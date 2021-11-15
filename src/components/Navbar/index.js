import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import firebase from "firebase/compat/app"; 


import Menu from "../Menu";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtnLink
} from './NavbarElements';

const Navbar = (props) => {
  const user = props.user;
  const onLogout = props.onLogout;

  const [error, setError] = useState()
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsUserSignedIn(true);
    } else {
      setIsUserSignedIn(false);
    }
  })


  var LoginLinks = <div className="LoginLinks"></div>
  if (user) {
    LoginLinks = <div className="LoginLinks">
      <NavBtnLink to="/" onClick={onLogout}>
        Sign out
      </NavBtnLink>
    </div>
  } else {
    LoginLinks = <div className="LoginLinks">
      <NavLink className="sign-up" to="/sign-up" activeStyle>
        Sign up
      </NavLink>
      <NavBtnLink to="/sign-in">
        Sign in
      </NavBtnLink>
    </div>
  }

  //TESTING
  async function handleLogout() {
    setError('')
    console.log(error, currentUser); // for now
    try {
      await logout()
      history.push("/")
    } catch {
      setError('Failed to log out')
    }
  }
    
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <h1>Better Weather</h1>
        </NavLink>
        <Menu user={isUserSignedIn}
            onLogout={handleLogout}/>
        <NavMenu>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/settings' activeStyle>
            Settings
          </NavLink>
          {LoginLinks}
        </NavMenu>
      </Nav>
    </>
  );
};


export default Navbar;
