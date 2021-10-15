import React, {useState, useEffect } from 'react';
import './styles/App.css';
import LocationSearch from './components/LocationSearch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'New York',
    };
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
  }

  handleLocationSubmit(location) {
    this.setState({location: location});
    console.log("Submitted location: ", location);
  }
    
  render() {
    const location = this.state.location; 
    return (
      <div> 
        <LocationSearch
          location={location}
          onLocationSubmit={this.handleLocationSubmit} />
        <p> Weather for: {location} </p>
      </div>
    );
  }
}

export default App;
