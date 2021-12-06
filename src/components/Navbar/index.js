import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";
import firebase from "firebase/compat/app";
import Menu from "../Menu";
import LoginLinks from "../LoginLinks";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = ({ user, onLogout }) => {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsUserSignedIn(true);
    } else {
      setIsUserSignedIn(false);
    }
  });

  // TESTING
  async function handleLogout() {
    setError("");
    console.log(error, currentUser); // for now
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>Better Weather</h1>
        </NavLink>
        <Menu user={isUserSignedIn} onLogout={handleLogout} />
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/settings" activeStyle>
            Settings
          </NavLink>
          <NavLink to="/add-location" activeStyle>
            Add Location 
          </NavLink>
          <LoginLinks
            user={user}
            onLogout={onLogout}
          />
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
