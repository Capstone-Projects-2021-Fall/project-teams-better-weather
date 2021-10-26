import React, {useState, useEffect} from 'react';
import LocationSearch from './components/LocationSearch';
import CurrentWeather from './components/CurrentWeather.js';
import HourlyWeather from './components/HourlyWeather.js';
import './style/Weather.css';

function App() {
  const [location, setLocation] = useState('New York');   
  const [weather, setWeather] = useState({}); 
  const [coord, setCoord] = useState({ "lon": -74.006, "lat": 40.7143 });
  const [hourly, setHourly] = useState({
    "hourly": {
      "data": []
    }
  });

  useEffect(() => {
    fetch(`http://api.betterweather.xyz/currently/?location=${location}`, {mode: 'cors'})
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setCoord(data.coord);
    });
  }, [location]);

  useEffect(() => {
    fetch(`http://api.betterweather.xyz/hourly/?coord=${coord.lon},${coord.lat}` {mode: 'cors'})
      .then(res => res.json())
      .then(data => {
        setHourly(data);
    });
  }, [coord]);

  function handleLocationSubmit(location) {
    setLocation(location);
    console.log("Submitted location: ", location);
  }

  function background() { // this will be a component some day
    const x = weather.main
    const ret = (typeof x != "undefined" && x.temp > 16)
    return (ret ? 'app warm' : 'app');
  }

  return (
    <div className={background()}>
      <div className="main">
          <LocationSearch 
            location={location}
            onLocationSubmit={handleLocationSubmit} />
          <CurrentWeather 
            weather={weather} />
          <HourlyWeather 
            weather={hourly} />
      </div>
    </div>
  );
}

export default App;
