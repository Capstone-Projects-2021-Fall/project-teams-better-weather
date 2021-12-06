import React from "react";
import "../style/Auxiliary.css";
import "../style/Weather.css";

/**
 * Function for displaying auxiliary attribute
 * @component
 * @param {number} attribute
 * @param {string} unit
 * @param {number} value
 * @returns {JSX.Element} JSX render of Auxiliary
 */
export default function Auxiliary({ attribute, unit, value }) {
  return (
    <>
      <div className="aux-box">
        <div className="weather-sum">{attribute}</div>
        <div className="temp-num">{value}{unit}</div>
      </div>
      <hr />
    </>
  );
}
