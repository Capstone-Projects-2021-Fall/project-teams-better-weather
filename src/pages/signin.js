import React from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";

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
