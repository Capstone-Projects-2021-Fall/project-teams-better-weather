import React from 'react'
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import Menu from "./Menu";

export const Nav = styled.nav`
  background: none;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: white;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

const Navbar = (props) => {
  const user = props.user;
  const onLogout = props.onLogout;

  var LoginLinks = <div className="LoginLinks"></div>
  if (user) {
    LoginLinks = <div className="LoginLinks">
      <NavBtnLink to="/" onClick={onLogout}>
        Sign out
      </NavBtnLink>
    </div>
  } else {
    LoginLinks = <div className="LoginLinks">
      <NavLink to="/sign-up" activeStyle>
        Sign up
      </NavLink>
      <NavBtnLink to="/sign-in">
        Sign in
      </NavBtnLink>
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
