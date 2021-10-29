import React, {useState, useEffect} from 'react';
import LocationSearch from './components/LocationSearch';
import CurrentWeather from './components/CurrentWeather.js';
import HourlyWeather from './components/HourlyWeather.js';
import Carousel from './components/Carousel';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import './style/Weather.css';

function App() {
  const [location, setLocation] = useState('New York');   
  const [weather, setWeather] = useState({}); 
  const [coord, setCoord] = useState({ "lon": -74.006, "lat": 40.7143 });
  const [hourly, setHourly] = useState({
    "hourly": {
      "data": []
    }
  });

  useEffect(() => {
    fetch(`https://api.betterweather.xyz/currently/?location=${location}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setCoord(data.coord);
    });
  }, [location]);

  useEffect(() => {
    fetch(`https://api.betterweather.xyz/hourly/?coord=${coord.lon},${coord.lat}`)
      .then(res => res.json())
      .then(data => {
        setHourly(data);
    });
  }, [coord]);

  function handleLocationSubmit(location) {
    setLocation(location);
    console.log("Submitted location: ", location);
  }

  function background() { // this will be a component some day
    const x = weather.main
    const ret = (typeof x != "undefined" && x.temp > 16)
    return (ret ? 'app warm' : 'app');
  }

  return (
    <div className={background()}>
      <div className="main">
          <LocationSearch 
            location={location}
            onLocationSubmit={handleLocationSubmit} />
          <CurrentWeather 
            weather={weather} />
          <HourlyWeather 
            weather={hourly} />
          <Carousel />
      </div>
    </div>
  );
}

export default App;
