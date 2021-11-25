import React from "react";
import Navbar from "../components/Navbar";
import Register from "../components/Register";

/**
 * Function that renders the signup page. This contains the navigation bar, signup component.
 * @component
 * @returns {JSX.Element} JSX render of Signup page
 */
export default function SignUp() {
  return (
    <>
      <div className="pages-bkg">
        <Navbar />
      </div>
      <Register />
    </>
  );
}
