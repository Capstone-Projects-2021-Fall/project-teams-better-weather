import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import firebase from "firebase/compat/app";
import Navbar from "../components/Navbar";

export default function About() {
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
      <div className="pages-bkg">
        <Navbar user={isUserSignedIn} onLogout={handleLogout} />
      </div>
      <h1>About</h1>
    </>
  );
}
