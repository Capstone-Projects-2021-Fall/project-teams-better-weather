import React from 'react';
import '../style/Weather.css';
//import { Card } from 'semantic-ui-react' //Semantic UI is a library to design the interface

//<p className="weather-info">Temperature{weatherData.name}</p>  //needed when implenting with API

const api = {
  key: "2292aca2fd8419dfc5d684db85f58a36",
  base: "https://api.openweathermap.org/data/2.5/"
}

function currentWeather(){
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
          />
        </div>
      </main>
    </div>
  );
  
}

export default currentWeather;