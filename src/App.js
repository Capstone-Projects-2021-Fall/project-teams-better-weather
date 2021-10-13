import React, {useState, useEffect } from 'react';
import './style/App.css';
import Weather from './components/Weather';

function App() {
  const [currentTemp, setCurrentTemp] = useState(0);
  
  //To be used later
  const [cityName, setCityName] = useState("Philadelphia")
  const [rain, setRain] = useState(3)
  const [wind, setWind] = useState(4)

  useEffect(() => {
    fetch('/api/currently').then(res => res.json()).then(data => {
      setCurrentTemp(data.currentTemp);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <b>Better Weather</b>
        {(typeof currentTemp != 'undefined') ? (
            <Weather weatherData={currentTemp}/>
          ):(
            <div></div>
      )}
      </header>
    </div>
  );
}

export default App;
