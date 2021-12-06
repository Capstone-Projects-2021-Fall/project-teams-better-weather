import React from "react";

import "../style/Auxiliary.css";

/**
 * Function that renders a list of Hour components
 * @component
 * @param {object} hourly - List of 12 hours of weather information (temperature, summary, etc)
 * @returns {JSX.Element} JSX render of Hourly Weather
 */
 export default function AuxiliaryWeather({humidity, windSpeed, pressure}) {
    return (
      <>
        <h3 className="hourly-title">Auxiliary Weather Conditions</h3>
        <div className="auxOverview">
          <div className='aux-box'> Humidity: {humidity}%</div>
            <div className='aux-box'> Wind Speed: {windSpeed}</div>
            <div className='aux-box'> Pressure: {pressure} </div>
        </div>
      </>
    );
  }
