import React from 'react';
import '../style/Weather.css';

function Hour(props) {
  
  return (
    <div className="weather-box" >              
      <div className="temp" >
        <div className="weather">
          {props.data.time+1} hour later
        </div>                  
        {Math.round(props.data.temperature)}°F
        <div className="weather">
          {props.data.summary}
        </div>                  
      </div>
    </div>
  );
}

export default Hour;
