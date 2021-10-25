import React from 'react';
import Hour from './Hour.js';
import '../style/Weather.css';

function HourlyWeather(props) {
  const data = props.weather["hourly"]["data"];
  //console.log("in the hourly", data);

  return (
    <div className="hourly-temp-box">
      <div className="time-frame">
        <ul> 
          {data.map((d) => <Hour key={d.temperature} data={d} />)}
        </ul>
      </div>
    </div>
  );
}

export default HourlyWeather;
