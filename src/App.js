import React, {useState, useEffect} from 'react';

import CurrentDate from './components/CurrentDate';
import LocationSearch from './components/LocationSearch';
import './style/Weather.css';  //change into App.css
import sun from './icons/sun/26.png';  //Make component to change icons based on weather.weather[0]

const api = {
  key: "2292aca2fd8419dfc5d684db85f58a36",
  base: "https://api.openweathermap.org/data/2.5/"  //for search
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
      .then(result => {
        setWeather(result);
        console.log(weather);
    });
  }, [location]);

  return (
    <div className='App-header'>

      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app')
        : 'app'}>
        <main>
          <LocationSearch
            location={location}
            onLocationSubmit={handleLocationSubmit} />

          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                  <div className="date">
                    <CurrentDate />
                  </div>                
              </div>
              <div className="weather-icon-box">
                <div className="icons">
                  <img src={sun} height={250} width={250} alt='Sun icon'/>
                </div>
              </div>
              <div className="weather-box">              
                <div className="temp">
                    {Math.round((weather.main.temp) * (9/5) + 32) }°F
                    <div className="weather">{weather.weather[0].main}</div>                  
                </div>
              </div>
            </div>
          ) : ('')}

          <div className="hourly-temp-box">
            <div className="time-frame">
              *Hourly Temps Here*
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default App;
