import React, { useState, useEffect } from 'react';
import LocationSearch from './LocationSearch';
import CurrentWeather from './CurrentWeather.js';
import HourlyWeather from './HourlyWeather.js';
import '../style/Weather.css';
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import firebase from "firebase/compat/app"; 

export default function MainPage() {

  //Weather
  const [location, setLocation] = useState('New York');   
  const [weather, setWeather] = useState({}); 
  const [coord, setCoord] = useState({ "lon": -74.006, "lat": 40.7143 });
  const [hourly, setHourly] = useState({
    "hourly": {
      "data": []
    }
  });

  //Login
  const [error, setError] = useState()
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      setIsUserSignedIn(true);
    } else {
      setIsUserSignedIn(false);
    }
  })

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
    if (str >= "05:00:00" && str < "08:00:00") { // Early morning
      return 'early-morning';
    }
    else if (str >= "08:00:00" && str < "16:00:00") { // Mid-day
      return 'mid-day';
    }
    else if (str >= "16:00:00" && str < "19:00:00") { // Evening
      return 'evening';
    }
    else { // Night
      return 'night';
    }
  }
  
  // Logout function
  async function handleLogout() {
    setError('')
    // for now
    console.log(error);
    console.log(currentUser);
    try {
        await logout()
        history.push("/")
    } catch{
        setError('Failed to log out')
    }
  }

  var LoginLinks = <div className="LoginLinks"></div>
    if (isUserSignedIn){
        LoginLinks = <div className="LoginLinks">
            <Nav.Link as={Link} to="/" onClick={handleLogout}>
                Signout
            </Nav.Link>
        </div>
    } else {
        LoginLinks = <div className="LoginLinks">
            <Nav.Link as={Link} to="/Login">
                Login
            </Nav.Link>
            <Nav.Link as={Link} to="/Signup">
                Signup
            </Nav.Link>
        </div>
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
                {LoginLinks}
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
