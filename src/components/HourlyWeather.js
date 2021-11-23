import React from "react";
import Hour from "./Hour.js";
import "../style/Weather.css";

export default function HourlyWeather(props) {
  const data = props.weather["hourly"]["data"];
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
