import React, {useState, useEffect} from 'react';
import CurrentWeather from './components/CurrentWeather.js';
import HourlyWeather from './components/HourlyWeather.js';
import Contact from './components/Contact.js';
import './style/Weather.css';

import LocationSearch from './components/LocationSearch.js';
import {Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import {Route, Link} from 'react-router-dom';

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
        if (data.currently.address) { // this could be better
          const d = data.currently;
          setWeather(d);
          const coord = {"lon": d.lon, "lat": d.lat};
          setCoord(coord);
        } else {
          window.alert("Invalid location. Please try again.");
        }
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
    const str = new Date().toLocaleTimeString('en-GB', { timeZone: weather.timezone });
    if(str >= "05:00:00" && str < "08:00:00"){
      //console.log("early morning");
      return 'early-morning';
    }
    else if(str >= "08:00:00" && str < "16:00:00"){
      //console.log("midday");
      return 'mid-day';
    }
    else if(str >= "16:00:00" && str < "19:00:00"){
      //console.log("evening");
      return 'evening';
    }
    else{
      //console.log("night");
      return 'night';
    }
    
    //const x = weather.current  //keep just in case?
    //const ret = (typeof x != "undefined" && x.temp > 16)
    //return (ret ? 'app warm' : 'app');
  }

  return (
    <div>
      <div className={background()}>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Better Weather</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Item>
                  <LocationSearch 
                    location={location}
                    onLocationSubmit={handleLocationSubmit} />
                </Nav.Item>
                <Nav.Link as={Link} to="/contact" >Contact</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Something</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="main">
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
