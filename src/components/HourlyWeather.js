import React from 'react';
import Hour from './Hour.js';
import '../style/Weather.css';

function HourlyWeather(props) {
  const data = props.weather["hourly"]["data"];
  return (
    <div className="carousel-scroll">
      <div className="scrollHours">
        {data.map((d) => <Hour key={d.temperature} data={d} />)}
      </div>
    </div>
      
  );
}

export default HourlyWeather;
