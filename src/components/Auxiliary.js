import React from "react";
import "../style/Weather.css";

/**
 * Function for displaying weather information at a particular hour
 * @component
 * @param {object} data - Weather data of particular hour (time, temperature, summary)
 * @returns {JSX.Element} JSX render of Hour
 */
export default function Auxiliary({ attribute, value }) {
  return (
    <div className="weather-box-hourly">
      <div className="weatherHours">
        <div className="weather-sum">{attribute}</div>
        <div className="temp-num">{value}</div>
      </div>
      <hr />
    </div>
  );
}
