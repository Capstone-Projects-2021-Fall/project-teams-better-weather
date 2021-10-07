import React, {useState, useEffect } from 'react';
import './style/App.css';
import Weather from './components/weather'

function App() {
  const [currentTemp, setCurrentTemp] = useState(0); 

  useEffect(() => {
    fetch('/api/currently').then(res => res.json()).then(data => {
      setCurrentTemp(data.currentTemp);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <b>Better Weather</b>
        <p>The current temperature is {currentTemp}</p>

        {(typeof currentTemp != 'undefined') ? (
        <Weather weatherData={currentTemp}/>
      ): (
        <div></div>
      )}
      </header>
    </div>
  );
}

export default App;
