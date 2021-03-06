import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import firebase from "firebase/compat/app";
import Navbar from "../components/Navbar";
import "../style/About.css";

/**
 * Function that renders the about page
 * @component
 * @returns {JSX.Element} JSX render of About page
 */
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
      <div className={"night"}>
        <div className="main">
          <Navbar user={isUserSignedIn} onLogout={handleLogout} />
          <div class="about-section">
            <h1><u>About Us</u></h1>
            <p>
              Better Weather aims to change the weather prediction process. The
              goal of Better Weather is to be able to predict short term weather
              with as good or better accuracy than the current numerical models
              that are widely used. With years of historical data received from
              the National Oceanic and Atmospheric Administration we have
              created a Machine Learning algorithm that hopes to replace
              numerical models.
            </p>
          </div>
          <p style={{ textAlign: "center" }}>
            <a
              href=" https://github.com/Capstone-Projects-2021-Fall/project-teams-better-weather"
              class="button"
            >
              Github
            </a>
          </p>
          <div class="about-section">
            <h1><u>Our Team</u></h1>
            <div class="container">
              <h3>Gannon Traynor</h3>
              <h3>Eriksiano Kapaj</h3>
              <h3>David Cho</h3>
              <h3>Jiayi Yi</h3>
              <h3>William Morris</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
