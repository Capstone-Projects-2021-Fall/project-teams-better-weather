import React, {useState, useEffect } from 'react';
import '../style/Weather.css';  //change into App.css

function LocationSearch(props) {
  const [userInput, setUserInput] = useState("");

  function handleInputChange(e) {
    setUserInput(e.target.value);
    console.log("User input: ", e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLocationSubmit(userInput);
    console.log("Handle submit: ", userInput);
  }

  return ( 
    <div className="search-box">
      <form onSubmit={handleSubmit}> 
        <input 
          type="text"
          className="search-bar"
          placeholder="Search location"
          value={userInput} 
          onChange={handleInputChange} />
        <input type="submit"/>
      </form>
    </div>
  );
}

export default LocationSearch;
