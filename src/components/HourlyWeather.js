import React from 'react';
import Hour from './Hour.js';
import '../style/Weather.css';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function HourlyWeather(props) {
  const data = props.weather["hourly"]["data"];
  //console.log("in the hourly", data);
  //console.log("hours", data[0].time+1);

  /*function setIndex(indexNum){
    let temp = data.map((d) => <Hour key={d.temperature} data={d} />);
    console.log("setIndex Hours", temp[3].props.data.time );
    let num = 0;
    for(let i = 0; i < data.length; i++){
      num = temp[i].props.data.time;
      console.log(num);
      if(num % 3 === 0){
        indexNum = indexNum + 1;
        //console.log(indexNum);
        //return indexNum;
      }
    }
  }*/



  return (
    <div className="carousel-scroll">
      <div className="scrollHours">
        {data.map((d) => <Hour key={d.temperature} data={d} />)}
      </div>
    </div>
      
  );
}

export default HourlyWeather;


/*<div className="carousel-scroll">
      <CarouselProvider
        naturalSlideWidth={8}
        naturalSlideHeight={3.5}
        totalSlides={4}
      >
        <div className="hourly-temp-box">
          <div className="time-frame">
            <div> 
              {data.map((d) => <Hour key={d.temperature} data={d} />)}
            </div> 
          </div>
        </div>
      </CarouselProvider>
    </div>
  */

/*<div className="carousel-scroll">
      <CarouselProvider
        naturalSlideWidth={8}
        naturalSlideHeight={3.5}
        totalSlides={4}
      >
        <Slider className="scrollHours">
          <Slide index={0} className="time-frame">
              {data.map((d) => <Hour key={d.temperature} data={d} />)}
          </Slide>
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </div>
  */