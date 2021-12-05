import React from "react";
import CurrentDate from "./CurrentDate";
import WeatherIcons from "./WeatherIcons";
import "../style/Weather.css";

/**
 * Function for displaying the current weather
 * @component
 * @param {number} temperature - Current weather temperature 
 * @param {object} misc - Extra information about current weather
 * @param {string} address - Current location
 * @returns {JSX.Element} JSX render of CurrentWeather
 */
export default function CurrentWeather({ temperature, misc, address }) {
  return (
    <div>
      {typeof temperature != "undefined" ? (
        <div>
          <div className="date">
            <CurrentDate />
          </div>
          <div className="currTemp">
            {Math.round(temperature * (9 / 5) + 32)}°F
          </div>
          <div className="weather-icon-box">
            <WeatherIcons icon={misc.icon} />
          </div>
          <div className="location-box">
            <div className="location">{address}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
