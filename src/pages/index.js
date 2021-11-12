import React, {useState, useEffect} from 'react';
import LocationSearch from '../components/LocationSearch';
import CurrentWeather from '../components/CurrentWeather.js';
import HourlyWeather from '../components/HourlyWeather';

import '../style/Weather.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
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
    }

    return (
        <>
            <div className={background()}>
                <div className="main">
                    <Navbar />
                    <Router>
                        <Switch>
                            <Route path='/' />
                        </Switch>
                    </Router>  
                    
                    <LocationSearch 
                        location={location}
                        onLocationSubmit={handleLocationSubmit} />
                    <CurrentWeather 
                        weather={weather} />
                    <HourlyWeather 
                        weather={hourly} />
                </div>
            </div>
        </>
    )
}

export default Home;

//<Menu />  //Moved btwn Router and Switch
