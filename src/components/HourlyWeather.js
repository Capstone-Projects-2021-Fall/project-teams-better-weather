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
  console.log(data);
  return (
    <div className="carousel-scroll">
      <h3 className="hourly-title"> Hourly Forecast </h3>
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
