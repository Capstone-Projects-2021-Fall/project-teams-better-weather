import React from 'react';
import '../style/Weather.css';

function Hour(props) {
  
  return (
    <div className="weather-box-hourly" >              
      <div className="tempHours" >
        <div className="weatherHours">
          {props.data.time+1} hour later
        </div>                  
        {Math.round(props.data.temperature)}°F
        <div className="weatherHours">
          {props.data.summary}
        </div>                 
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
