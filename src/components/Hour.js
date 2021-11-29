import React from 'react';
import '../style/Weather.css';

function Hour(props) {
  return (
    <div className="weather-box-hourly" >              
      <div className="weatherHours">
        <div className="hour-num">Hour {props.data.time+1}</div>
        <div className="temp-num">{Math.round(props.data.temperature)}°F</div>
        <div className="weather-sum">{props.data.summary}</div>
      </div>  
      <hr />              
    </div>
  );
}

export default Hour;


/* to be implemented later
<div className="hourlyIcons">
  <WeatherIcons icons={props.data.summary} />
</div> 
*/
