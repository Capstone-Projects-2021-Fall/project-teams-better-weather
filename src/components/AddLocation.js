import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { db } from "./Firebase";
import { ref, set, push, onValue } from "firebase/database";
import "../style/Weather.css";

export default function AddLocation() {
  const [savedLocations, setSavedLocations] = useState({
    data: [1, 1],
  });
  const [userInput, setUserInput] = useState("");
  /*
  var locations = {
    data: [],
  };
  */

  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  function handleSubmit(e) {
    if (e.key === "Enter") {
      addLocation(userInput);
    }
  }

  /*
  useEffect(() => {
    console.log("save this", locations);
    setSavedLocations(locations);
    console.log("internal", savedLocations);
  }, [locations]);
  */

  // This works
  function addLocation(location) {
    var user = firebase.auth().currentUser;
    const listRef = ref(db, "/users/" + user.uid + "/Locations");
    const newListRef = push(listRef);
    set(newListRef, location);

    console.log("add location success");
    const locations = getLocations()
    console.log("in the coop", locations.data);
    setSavedLocations(locations.data);
    console.log("save pls", savedLocations);
  }

  // code to get locations in array, but does not display properly :(
  // should be in own component
  function getLocations() {
    console.log("Hello");
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    const listRef = ref(db, "/users/" + user.uid + "/Locations");
    const locations = {
        data: [],
      };

    onValue(
      ref(db, "/users/" + uid + "/Locations"),
      (snapshot) => {
        let snap = snapshot.val();
        //console.log("snap", snap);
        for (let i in snap) {
          locations.data.push(snap[i]);
          console.log("update locations fb");
        }
        console.log(locations);
        //setSavedLocations(locations);
        //console.log("save pls", savedLocations);
      },
      {
        onlyOnce: true,
      }
    );
    return locations;

    /*
    return (
      <div>
        <p>hello</p>
        {locations.map((loc) => (
          <p>{loc}</p>
        ))}
      </div>
    );
    */
  }

  /*
  function display() {
    return (
      {locations.map((d) => (
        <p>{d}<p>
      ))}
    );
  }
  */



  return (
    <>
      <div className="main">
        <input
          type="text"
          className="search-bar"
          placeholder="Search location"
          value={userInput}
          onChange={handleInputChange} 
          onKeyPress={handleSubmit}
        />
        <div className="w-100 text-center mt-2">
          <br></br>
          <Link to="/">Go back to main page</Link>
        </div>
      </div>
    </>
  );
}
