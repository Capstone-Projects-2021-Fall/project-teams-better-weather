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
      <div className="weatherHours">
        <div className="hour-num">{data.time + 1} hour later</div>
        <div className="temp-num">{Math.round(data.temperature)}°F</div>
        <div className="weather-sum">{data.summary}</div>
      </div>
      <hr />
    </div>
  );
}

/* to be implemented later
<div className="hourlyIcons">
  <WeatherIcons icons={props.data.summary} />
</div> 
*/
