import React, {useState} from 'react';
import '../style/Weather.css';  //change into App.css

function LocationSearch(props) {
  const [userInput, setUserInput] = useState("");

  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  function handleSubmit(e) {
    if (e.key === "Enter") {
      props.onLocationSubmit(userInput);
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
