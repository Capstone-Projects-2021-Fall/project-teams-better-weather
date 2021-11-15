import React, {useState} from 'react';
import '../style/Weather.css';  //change into App.css
import firebase from "firebase/compat/app"
import {db} from './Firebase.js'
import { set, ref } from 'firebase/database'

function LocationSearch(props) {
  const [userInput, setUserInput] = useState("");
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      setIsUserSignedIn(true);
    } else {
      setIsUserSignedIn(false);
    }
  })

  //Function to save last location
  async function lastLocation(location){
    var user = firebase.auth().currentUser
    const locRef = ref(db, '/users/' + user.uid + '/LastLocation');
    await set(locRef, location)
  }

  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  function handleSubmit(e) {
    if (e.key === "Enter") {
      props.onLocationSubmit(userInput);
      if(isUserSignedIn){
        lastLocation(userInput);
      }
      console.log("Handle submit: ", userInput);
    }
  }

  return ( 
    <div className="search-box">
      <input 
        type="text"
        className="search-bar"
        placeholder="Search location"
        value={userInput} 
        onChange={handleInputChange}
        onKeyPress={handleSubmit} />
    </div>
  );
}

export default LocationSearch;
