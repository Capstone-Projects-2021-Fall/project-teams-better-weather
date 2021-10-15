import React from 'react';

import Weather from './components/weather.js';


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


  return (
  <div className='App-header'>
    <Weather />
  </div>
  );
}

export default App;
