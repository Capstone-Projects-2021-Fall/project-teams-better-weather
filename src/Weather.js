import React from 'react';
import './style/weather.css';
import { Card } from 'semantic-ui-react' //Semantic UI is a library to design the interface

const CardExampleCard = ({weatherData}) => (  //child component of app.js
  <Card>
    <Card.Content>
        <Card.Header className="header">{weatherData.name}</Card.Header>
    </Card.Content>
  </Card>
)

export default CardExampleCard;