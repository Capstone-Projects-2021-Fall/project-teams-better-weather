import React from "react";
import Hour from "./Hour";
import "../style/Weather.css";

/**
 * Function that renders a list of Hour components
 * @component
 * @param {object} hourly - List of 12 hours of weather information (temperature, summary, etc)
 * @returns {JSX.Element} JSX render of Hourly Weather
 */
export default function HourlyWeather({ hourly, timeFrame }) {
  const { data } = hourly;

  timeFrame =  timeFrame - 1;
  console.log("timeFrame", timeFrame);
  
  function currTime(time){
    if (time >= 23){
      return time -= 24;
    }
    return time;
  }

  return (
    <div className="carousel-scroll">
      <h3 className="hourly-title"> Hourly Forecast </h3>
      <div className="scrollHours">
        {data.map((d) => (
          <Hour
            key={d.time} 
            data={d} 
            time = {currTime(timeFrame+=1)}
          />
        ))}
      </div>
    </div>
  );
}
