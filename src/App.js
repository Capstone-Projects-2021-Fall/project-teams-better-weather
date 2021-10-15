import React, {useState} from 'react';

import CurrentDate from './components/CurrentDate';
import './style/Weather.css';  //change into App.css


const api = {
  key: "2292aca2fd8419dfc5d684db85f58a36",
  base: "https://api.openweathermap.org/data/2.5/"  //for search
}

function App() {
  //const [currentTemp, setCurrentTemp] = useState(0);
  
  //To be used later
  /*const [cityName, setCityName] = useState("Philadelphia")
  const [rain, setRain] = useState(3)
  const [wind, setWind] = useState(4)*/

  /*
  useEffect(() => {
    fetch('/api/currently').then(res => res.json()).then(data => {
      setCurrentTemp(data.currentTemp);
    });
  }, []);
  */

  //All from Open Weather API
  const [query, setQuery] = useState('');  //The city name
  const [weather, setWeather] = useState({});  //Current weather temp info

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(weather);
      });
    }
  }

  return (
  <div className='App-header'>

    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app')
      : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">
                  <CurrentDate />
                </div>                
            </div>
            <div className="weather-box">              
              <div className="temp">
                  {Math.round((weather.main.temp) * (9/5) + 32) }°F
                  <div className="weather">{weather.weather[0].main}</div>                  
              </div>
            </div>
          </div>
        ) : ('')}

        <div className="hourly-temp-box">
          <div className="time-frame">
            *Hourly Temps Here*
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}

export default App;
