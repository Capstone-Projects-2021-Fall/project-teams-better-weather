import React, {useState} from 'react';
import CurrentDate from './CurrentDate.js'
import '../style/Weather.css';
import sun from '../icons/sun/26.png';  //Make component to change icons based on weather.weather[0] (weather type)

//import { Card } from 'semantic-ui-react' //Semantic UI is a library to design the interface

//<p className="weather-info">Temperature{weatherData.name}</p>  //needed when implenting with API

const api = {
  key: "2292aca2fd8419dfc5d684db85f58a36",
  base: "https://api.openweathermap.org/data/2.5/"  //for search
}

function CurrentWeather(){

  //All from Open Weather API
  const [query, setQuery] = useState('');  //The city name
  const [weather, setWeather] = useState({});  //Current weather temp info

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(weather);
      });
    }
  }
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app')
      : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
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
  );
  
}

export default CurrentWeather;