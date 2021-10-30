import React, {useState} from 'react';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function Carousel(props){

  const [hourTemp, setHourTemp] = useState(0)

    return(
      <div className="carousel-scroll">
        <CarouselProvider
          naturalSlideWidth={8}
          naturalSlideHeight={3.5}
          totalSlides={4}
        >
            <Slider className="scrollHours">
              <Slide index={0} className="bg1">I am the first Slide.</Slide>
              <Slide index={1} className="bg2">I am the second Slide.</Slide>
              <Slide index={2} className="bg3">I am the third Slide.</Slide>
              <Slide index={3} className="bg4">I am the fourth Slide.</Slide>
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          
        </CarouselProvider>
      </div>        
    );
    
}

export default Carousel;