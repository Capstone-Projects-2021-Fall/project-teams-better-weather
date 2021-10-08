import React, {useState, useEffect } from 'react';
import './App.css';

class LocationSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '', // This might be useful for autocomplete later?
    }
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({userInput: e.target.value});
    console.log("User input: ", e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onLocationSubmit(this.state.userInput);
  }

  render() {
    const userInput = this.state.userInput;
    return ( 
      <div>
        <form onSubmit={this.handleSubmit}> 
          <input 
            type="text"
            value={userInput} 
            onChange={this.handleInputChange} />
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

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
        <LocationSearchBar
          location={location}
          onLocationSubmit={this.handleLocationSubmit} />
        <p> Weather for: {location} </p>
      </div>
    );
  }
}

export default App;
