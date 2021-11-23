import React from "react";
import Navbar from "../components/Navbar";
import SignupPage from "../components/Signup";

export default function Signup() {
  return (
    <>
      <div className="pages-bkg">
        <Navbar />
      </div>
      <SignupPage />
    </>
  );
}
