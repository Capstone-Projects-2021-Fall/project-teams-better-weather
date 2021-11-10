import React from 'react';
import CurrentDate from './CurrentDate.js';
import WeatherIcons from './WeatherIcons.js';
import '../style/Weather.css';

//import { Card } from 'semantic-ui-react' 

function CurrentWeather(props) {
  return (
    <div>
      {(typeof props.weather.current != "undefined") ? (
        <div>
          <div className="date">
            <CurrentDate />
          </div> 
          <div className="currTemp">
            {Math.round((props.weather.current.temp) * (9/5) + 32) }°F
          </div>
          <div className="weather-icon-box">
            <WeatherIcons icons={props.weather.current?.weather[0]} />
          </div>
          <div className="location-box">
            <div className="location">{props.weather.address}</div>
          </div>
        </div>
      ) : ('')}
    </div>
  );
}

export default CurrentWeather;

/*
<div className="weather-box">              
  <div className="temp">
    <div className="weather">{props.weather.current?.weather[0].main}</div>
  </div>
</div>
*/
