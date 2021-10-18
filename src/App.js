import React, {useState, useEffect} from 'react';
import LocationSearch from './components/LocationSearch';
import CurrentWeather from './components/CurrentWeather.js';
import HourlyWeather from './components/HourlyWeather.js';
import './style/Weather.css';

const api = {
  key: "2292aca2fd8419dfc5d684db85f58a36", // exposed key!
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [location, setLocation] = useState('New York');   
  const [weather, setWeather] = useState({}); 

  function handleLocationSubmit(location) {
    setLocation(location);
    console.log("Submitted location: ", location);
  }
  
  useEffect(() => {
    fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        console.log(weather);
    });
  }, [location]);

  const[hourly, setHourly] = useState({});
  useEffect(() => {
    fetch("api/hourly/").then(res => res.json())
      .then(data => {
        setHourly(data);
        console.log(hourly);
    });
  }, [location]);

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
            weather={weather} />
      </div>
    </div>
  );
}

export default App;
