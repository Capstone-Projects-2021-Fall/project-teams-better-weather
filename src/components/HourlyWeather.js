import React from 'react';
import Hour from './Hour.js';
import '../style/Weather.css';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function HourlyWeather(props) {
  const data = props.weather["hourly"]["data"];
  //console.log("in the hourly", data);

  return (
    <div className="carousel-scroll">
      <div className="scrollHours">
        {data.map((d) => <Hour key={d.temperature} data={d} />)}
      </div>
    </div>
      
  );
}

export default HourlyWeather;