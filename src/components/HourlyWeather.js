import React from 'react';
import Hour from './Hour.js';
import '../style/Weather.css';

function HourlyWeather(props) {
  const data = props.weather["hourly"]["data"];
  return (
    <div className="carousel-scroll">
      <h3 className="hourly-title"> Hourly Forecast </h3>
      <div className="scrollHours">
        {data.map((d) => 
          <Hour key={d.time} data={d} 
        />)}
      </div>
    </div>
      
  );
}

export default HourlyWeather;
