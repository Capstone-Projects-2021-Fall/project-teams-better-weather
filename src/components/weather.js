import React from 'react';
import '../style/Weather.css';
import { Card } from 'semantic-ui-react' //Semantic UI is a library to design the interface

//<p className="weather-info">Temperature{weatherData.name}</p>  //needed when implenting with API

const CardExampleCard = ({weatherData, location}) => (  //child component of app.js
  <Card>
    <Card.Content>
        <Card.Header className="header">City Name: {location}</Card.Header>
        <p className="weather-info">Temperature: {weatherData}</p>
        <p className="weather-info">Wind: </p>
        <p className="weather-info">Preciptation: </p>
    </Card.Content>
  </Card>
)

export default CardExampleCard;