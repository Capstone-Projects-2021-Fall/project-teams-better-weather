import React from "react";
import Hour from "./Hour";
import "../style/Weather.css";

/**
 * Function that renders a list of Hour components
 * @component
 * @param {object} hourly - List of 12 hours of weather information (temperature, summary, etc)
 * @returns {JSX.Element} JSX render of Hourly Weather
 */
export default function HourlyWeather({ hourly }) {
  const { data } = hourly;
  return (
    <div className="carousel-scroll">
      <h6> Hourly Forecast </h6>
      <div className="scrollHours">
        {data.map((d) => (
          <Hour 
            key={d.time} 
            data={d} 
          />
        ))}
      </div>
    </div>
  );
}
