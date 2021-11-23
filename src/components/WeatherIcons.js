import React from "react";
import sun from "../icons/26.png";
import clearNight from "../icons/10.png";
import fewCloudsD from "../icons/27.png";
import fewCloudsN from "../icons/15.png";
import cloud from "../icons/35.png";
import showerRain from "../icons/7.png";
import rainD from "../icons/8.png";
import rainN from "../icons/1.png";
import thunderstorm from "../icons/12.png";
import snow from "../icons/23.png";
import fogD from "../icons/4.png";
import fogN from "../icons/14.png";

function WeatherIcons(props) {
  const { icons } = props;

  function setWeatherIcon(type) {
    switch (type) {
      case "01d":
        return sun;
      case "01n":
        return clearNight;
      case "02d":
        return fewCloudsD;
      case "02n":
        return fewCloudsN;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return cloud;
      case "09d":
      case "09n":
        return showerRain;
      case "10d":
        return rainD;
      case "10n":
        return rainN;
      case "11d":
      case "11n":
        return thunderstorm;
      case "13d":
      case "13n":
        return snow;
      case "50d":
        return fogD;
      case "50n":
        return fogN;
      default:
        return null;
    }
  }

  return (
    <div>
      <img src={setWeatherIcon(icons.icon)} height={181} width={230} alt="" />
    </div>
  );
}

export default WeatherIcons;
