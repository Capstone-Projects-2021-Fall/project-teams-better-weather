import React from "react";
import "../style/Weather.css";

/**
 * Function for displaying weather information at a particular hour
 * @component
 * params props
 * @returns {JSX.Element} JSX render of Hour
 */
export default function Hour(props) {
  return (
    <div className="weather-box-hourly">
      <div className="tempHours">
        <div className="weatherHours">{props.data.time + 1} hour later</div>
        {Math.round(props.data.temperature)}°F
        <div className="weatherHours">{props.data.summary}</div>
      </div>
    </div>
  );
}

/* to be implemented later
<div className="hourlyIcons">
  <WeatherIcons icons={props.data.summary} />
</div> 
*/
