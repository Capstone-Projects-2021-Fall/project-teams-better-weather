import { NavLink, NavBtnLink } from "./Navbar/NavbarElements";

export default function LoginLinks(props) {
  const { user, onLogout } = props;

  var LoginLinks = <div className="LoginLinks"></div>;
  if (user) {
    LoginLinks = (
      <div className="LoginLinks">
        <NavBtnLink to="/" onClick={onLogout}>
          Sign out
        </NavBtnLink>
      </div>
    );
  } else {
    LoginLinks = (
      <div className="LoginLinks login-sidemenu">
        <NavLink className="sign-up" to="/sign-up" activeStyle>
          Sign up
        </NavLink>
        <NavBtnLink to="/sign-in">Sign in</NavBtnLink>
      </div>
    );
  }

  return (
    <>
      {LoginLinks} 
    </>
  );
}
