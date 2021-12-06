import React from "react";
import "../style/Weather.css";

/**
 * Function that renders a list of auxiliary attributes of current weather
 * @component
 * @param {number} humidity 
 * @param {number} windGust 
 * @param {number} windSpeed 
 * @param {number} pressure 
 * @returns {JSX.Element} JSX render of AuxiliaryWeather
 */
export default function AuxiliaryWeather({ humidity, windGust, windSpeed, pressure }) {
  return (
    <div className="carousel-scroll">
      <h3 className="hourly-title">Auxiliary Weather Conditions</h3>
      <div className="scrollHours">
        <div>
          <div> Humidity: {humidity} </div>
          <div> Wind Gust: {windGust} </div>
          <div> Wind Speed: {windSpeed} </div>
          <div> Pressure: {pressure} </div>
        </div>
      </div>
    </div>
  );
}
