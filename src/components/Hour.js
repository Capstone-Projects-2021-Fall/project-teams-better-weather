import React from "react";
import "../style/Weather.css";

/**
 * Function for displaying weather information at a particular hour
 * @component
 * @param {object} data - Weather data of particular hour (time, temperature, summary)
 * @returns {JSX.Element} JSX render of Hour
 */
export default function Hour({ data, time}) {
  return (
    <div className="weather-box-hourly">
      <div className="weatherHours">
        <div className="hour-num">{time + 1}:00</div>
        <div className="temp-num">{Math.round(data.temperature)}°F</div>
        <div className="weather-sum">{data.summary}</div>
      </div>
      <hr />
    </div>
  );
}
