import React from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";

/**
 * Function that renders the signin page. This contains the navigation bar, login component.
 * @component
 * @returns {JSX.Element} JSX render of Signin page
 */
export default function Signin() {
  return (
    <>
      <div className="pages-bkg">
        <Navbar />
      </div>
      <Login />
    </>
  );
}
