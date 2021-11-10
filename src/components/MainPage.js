import React, {useState, useEffect} from 'react';
import LocationSearch from './LocationSearch';
import CurrentWeather from './CurrentWeather.js';
import HourlyWeather from './HourlyWeather.js';

import '../style/Weather.css';
import * as ReactBootStrap from "react-bootstrap";
import Contact from '../contact';
import {Route, Link, useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext.js';
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
    const x = weather.current
    const ret = (typeof x != "undefined" && x.temp > 16)
    return (ret ? 'app warm' : 'app');
  }

  //logout function
  async function handleLogout() {
    setError('')
    try {
        await logout()
        history.push("/")
    } catch{
        setError('Failed to log out')
    }
  }

  var LoginLinks = <div className="LoginLinks"></div>
    if(isUserSignedIn){
        LoginLinks = <div className="LoginLinks">
            <ReactBootStrap.Nav.Link as={Link} to="/" onClick={handleLogout}>
                Signout
            </ReactBootStrap.Nav.Link>
        </div>
    } else {
        LoginLinks = <div className="LoginLinks">
            <ReactBootStrap.Nav.Link as={Link} to="/Login">
                Login
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link as={Link} to="/Signup">
                Signup
            </ReactBootStrap.Nav.Link>
        </div>
    }

  return (

    <div>
    
    <ReactBootStrap.Navbar bg="light" expand="lg">
  <ReactBootStrap.Container>
    <ReactBootStrap.Navbar.Brand href="#home">Better Weather</ReactBootStrap.Navbar.Brand>
    <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
    <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
      <ReactBootStrap.Nav className="me-auto">

        <ReactBootStrap.Nav.Item>
        <LocationSearch 
            location={location}
            onLocationSubmit={handleLocationSubmit} />
        </ReactBootStrap.Nav.Item>

  
        {LoginLinks}
        <ReactBootStrap.Nav.Link href="#home">Home</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link as={Link} to="/contact" >Contact</ReactBootStrap.Nav.Link>
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
          
          <CurrentWeather 
            weather={weather} />
          <HourlyWeather 
            weather={hourly} />
      </div>
    </div>
    </div>
  );
}