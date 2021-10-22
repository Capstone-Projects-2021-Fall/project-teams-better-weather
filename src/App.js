import React, {useState, useEffect} from 'react';
import LocationSearch from './components/LocationSearch';
import CurrentWeather from './components/CurrentWeather.js';
import HourlyWeather from './components/HourlyWeather.js';
import './style/Weather.css';
import * as ReactBootStrap from "react-bootstrap";

const api = {
  key: "2292aca2fd8419dfc5d684db85f58a36", // exposed key!
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [location, setLocation] = useState('New York');   
  const [weather, setWeather] = useState({}); 
  const [coord, setCoord] = useState({
    "lon": -74.006,
    "lat": 40.7143
  });
  const [hourly, setHourly] = useState({
    "hourly": {
      "data": []
    }
  });

  useEffect(() => {
    fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setCoord(data["coord"]);
        console.log("coord", coord.lon, coord.lat);
        console.log(weather);
    });
  }, [location]);
  
  useEffect(() => {
    fetch(`api/hourly/?coord=${coord.lon},${coord.lat}`)
      .then(res => res.json())
      .then(data => {
        setHourly(data);
        console.log("hourly from s3", hourly);
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
    <div>
    <ReactBootStrap.Navbar bg="light" expand="lg">
  <ReactBootStrap.Container>
    <ReactBootStrap.Navbar.Brand href="#home">Better Weather</ReactBootStrap.Navbar.Brand>
    <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
    <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
      <ReactBootStrap.Nav className="me-auto">
        <ReactBootStrap.Nav.Link href="#home">Home</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link href="#link">Link</ReactBootStrap.Nav.Link>
        <ReactBootStrap.NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <ReactBootStrap.NavDropdown.Item href="#action/3.1">Action</ReactBootStrap.NavDropdown.Item>
          <ReactBootStrap.NavDropdown.Item href="#action/3.2">Another action</ReactBootStrap.NavDropdown.Item>
          <ReactBootStrap.NavDropdown.Item href="#action/3.3">Something</ReactBootStrap.NavDropdown.Item>
          <ReactBootStrap.NavDropdown.Divider />
          <ReactBootStrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBootStrap.NavDropdown.Item>
        </ReactBootStrap.NavDropdown>
      </ReactBootStrap.Nav>
    </ReactBootStrap.Navbar.Collapse>
  </ReactBootStrap.Container>
</ReactBootStrap.Navbar>

    <div className={background()}>
      <div className="main">
          <LocationSearch 
            location={location}
            onLocationSubmit={handleLocationSubmit} />
          <CurrentWeather 
            weather={weather} />
          <HourlyWeather 
            weather={hourly} />
      </div>
    </div>
    </div>
  );
}

export default App;
