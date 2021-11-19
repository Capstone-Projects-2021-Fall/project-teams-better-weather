import React from 'react';
import '../style/Weather.css';

function Hour(props) {
  return (
    <div className="weather-box-hourly" >              
      <div className="weatherHours">
        <span className="hour-num">Hour {props.data.time+1}</span>
        <span className="temp-num">{Math.round(props.data.temperature)}°F</span>
        <span className="weather-sum">{props.data.summary}</span>
      </div>                
    </div>
  );
}

export default Hour;


/* to be implemented later
<div className="hourlyIcons">
  <WeatherIcons icons={props.data.summary} />
</div> 
*/
