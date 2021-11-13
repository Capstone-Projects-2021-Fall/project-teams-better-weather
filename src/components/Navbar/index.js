import React from 'react'
import Menu from "../../components/Menu.js";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtnLink
} from './NavbarElements';

const Navbar = () => {
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
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
          <NavBtnLink to='/sign-in'>Sign In</NavBtnLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
