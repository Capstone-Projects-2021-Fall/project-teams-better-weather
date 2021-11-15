import React from 'react'
import Menu from "../Menu";
import {
  Nav,
  NavLink,
  NavMenu,
} from './NavbarElements';

const Navbar = (props) => {
  const user = props.user;
  const onLogout = props.onLogout;

  var LoginLinks = <div className="LoginLinks"></div>
  if (user) {
    LoginLinks = <div className="LoginLinks">
      <NavLink to="/" onClick={onLogout}>
        Sign out
      </NavLink>
    </div>
  } else {
    LoginLinks = <div className="LoginLinks">
      <NavLink to="/sign-up" activeStyle>
        Sign up
      </NavLink>
      <NavLink to="/sign-in">
        Sign in
      </NavLink>
    </div>
  }
    
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <h1>Better Weather</h1>
        </NavLink>
        <Menu />
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
