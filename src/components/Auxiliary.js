import React from "react";

import "../style/Auxiliary.css";

/**
 * Function that renders a list of Hour components
 * @component
 * @param {object} hourly - List of 12 hours of weather information (temperature, summary, etc)
 * @returns {JSX.Element} JSX render of Hourly Weather
 */
 export default function AuxiliaryWeather({humidity, windSpeed, windGust, pressure}) {
    return (
      <>
        <h3 className="aux-title">Auxiliary Weather Conditions</h3>
        <div className="auxOverview">
          <div className='aux-box'> Humidity: {humidity}%</div>
          <div className='aux-box'> Wind Speed: {windSpeed} m/s</div>
          <div className='aux-box'> Wind Gust: {windGust} m/s</div>
          <div className='aux-box'> Pressure: {pressure} hPa</div>
        </div>
      </>
    );
  }
