import React from "react";
import Auxiliary from "./Auxiliary";
import "../style/Auxiliary.css";
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
    <>
      <h3 className="aux-title">Auxiliary Weather Conditions</h3>
      <div className="auxOverview">
        <Auxiliary attribute="Humidity" unit="%" value={humidity} />
        <Auxiliary attribute="Wind Gust" unit="m/s" value={windGust} />
        <Auxiliary attribute="Wind Speed" unit="m/s" value={windSpeed} />
        <Auxiliary attribute="Pressure" unit="hPa" value={pressure} />
      </div>
    </>
  );
}
