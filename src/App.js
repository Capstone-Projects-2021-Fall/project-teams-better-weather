import React, {useState, useEffect } from 'react';
import './styles/App.css';
import LocationSearch from './components/LocationSearch';

function App() {
  const [location, setLocation] = useState('New York');   

  function handleLocationSubmit(location) {
    setLocation(location);
    console.log("Submitted location: ", location);
  }

  return (
    <div> 
      <LocationSearch
        location={location}
        onLocationSubmit={handleLocationSubmit} />
      <h1> Weather for: {location} </h1>
    </div>
  );
}

export default App;
