import React from "react";

import "../style/Weather.css";

/**
 * Function that renders a list of Hour components
 * @component
 * @param {object} hourly - List of 12 hours of weather information (temperature, summary, etc)
 * @returns {JSX.Element} JSX render of Hourly Weather
 */
 export default function AuxiliaryWeather({humidity, windSpeed, pressure}) {
    return (
      <div className="carousel-scroll">
        <h3 className="hourly-title">Auxiliary Weather Conditions</h3>
        <div className="scrollHours">
       <div>
         <div> Humidity: {humidity} </div>
          <div> Wind Speed: {windSpeed} </div>
          <div> Pressure: {pressure} </div>
       </div>
        </div>
      </div>
    );
  }
