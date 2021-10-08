import React, {useState, useEffect } from 'react';
import './App.css';

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
      </header>
    </div>
  );
}

export default App;
