import React from "react";
import "../style/Weather.css";

/**
 * Function for displaying weather information at a particular hour
 * @component
 * @param {object} data - Weather data of particular hour (time, temperature, summary)
 * @returns {JSX.Element} JSX render of Hour
 */
export default function Hour({ data }) {
  return (
    <div className="weather-box-hourly">
      <div className="tempHours">
        <div className="weatherHours">{data.time + 1} hour later</div>
        {Math.round(data.temperature)}°F
        <div className="weatherHours">{data.summary}</div>
      </div>
    </div>
  );
}

/* to be implemented later
<div className="hourlyIcons">
  <WeatherIcons icons={props.data.summary} />
</div> 
*/
