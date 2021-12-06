import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import firebase from "firebase/compat/app";
import LocationSearch from "../components/LocationSearch";
import CurrentWeather from "../components/CurrentWeather";
import HourlyWeather from "../components/HourlyWeather";
import AuxiliaryWeather from "../components/AuxiliaryWeather";
import Navbar from "../components/Navbar";
import "../style/Weather.css";
import { db } from "../components/Firebase";
import { ref, onValue } from "firebase/database";

/**
 * Function that renders the home page. This contains the navigation bar, location search bar, current and hourly weather components.
 * @component
 * @returns {JSX.Element} JSX render of Home page
 */
export default function Home() {
  const [location, setLocation] = useState("New York");
  const [weather, setWeather] = useState({});
  const [coord, setCoord] = useState({ lon: -74.006, lat: 40.7143 });
  const [hourly, setHourly] = useState({
    hourly: {
      data: [],
    },
  });

  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsUserSignedIn(true);
      getLastLocation();
    } else {
      setIsUserSignedIn(false);
    }
  });

  useEffect(() => {
    fetch(`https://api.betterweather.xyz/currently/?location=${location}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.currently.address) {
          // this could be better
          const d = data.currently;
          setWeather(d);
          const coord = { lon: d.lon, lat: d.lat };
          setCoord(coord);
        } else {
          window.alert("Invalid location. Please try again.");
        }
      });
  }, [location]);

  useEffect(() => {
    fetch(
      `https://api.betterweather.xyz/hourly/?coord=${coord.lon},${coord.lat}`
    )
      .then((res) => res.json())
      .then((data) => {
        setHourly(data);
      });
  }, [coord]);

  /**
   * Helper function to set location when user submits
   * @function
   * @param {string} location
   */
  function handleLocationSubmit(location) {
    setLocation(location);
    console.log("Submitted location: ", location);
  }

  /**
   * Helper function to set the background color depending on time of day
   * @function
   */
  function background() {
    // this will be a component some day
    const str = new Date().toLocaleTimeString("en-GB", {
      timeZone: weather.timezone,
    });
    if (str >= "05:00:00" && str < "08:00:00") {
      return "early-morning";
    } else if (str >= "08:00:00" && str < "16:00:00") {
      return "mid-day";
    } else if (str >= "16:00:00" && str < "19:00:00") {
      return "evening";
    } else {
      return "night";
    }
  }

  /**
   * Helper function to handle user logouts
   * @function
   */
  async function handleLogout() {
    setError("");
    console.log(error, currentUser); // for now
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  /**
   * Helper function to get user's most recent searched location from Firebase
   * @function
   */
  function getLastLocation() {
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    return onValue(
      ref(db, "/users/" + uid),
      (snapshot) => {
        setLocation(snapshot.val().LastLocation);
      },
      {
        onlyOnce: true,
      }
    );
  }

  return (
    <>
      <div className={background()}>
        <div className="main">
          <Navbar user={isUserSignedIn} onLogout={handleLogout} />
          <LocationSearch
            location={location}
            onLocationSubmit={handleLocationSubmit}
          />
          <CurrentWeather 
            temperature={weather.current?.temp}
            misc={weather.current?.weather[0]}
            address={weather.address}
          />
          <HourlyWeather 
            hourly={hourly.hourly}
          />
          <AuxiliaryWeather
            humidity={weather.current?.humidity}
            windGust={weather.current?.wind_gust}
            windSpeed={weather.current?.wind_speed}
            pressure={weather.current?.pressure}
          />
        </div>
      </div>
    </>
  );
}
