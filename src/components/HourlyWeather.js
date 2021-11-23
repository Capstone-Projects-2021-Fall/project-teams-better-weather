import React from "react";
import Hour from "./Hour";
import "../style/Weather.css";

/**
 * Function that renders a list of Hour components
 * @component
 * @params props
 * @returns {JSX.Element} JSX render of Hourly Weather
 */
export default function HourlyWeather(props) {
  const { data } = props.weather.hourly;
  return (
    <div className="carousel-scroll">
      <h6> Hourly Forecast </h6>
      <div className="scrollHours">
        {data.map((d) => (
          <Hour key={d.time} data={d} />
        ))}
      </div>
    </div>
  );
}
