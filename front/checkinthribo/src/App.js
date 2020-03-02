import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      alert("Geolocation is not suppoerted by this browser");
    }
  }

  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    this.reverseGeocodeCoordinates();
  }

  reverseGeocodeCoordinates() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=AIzaSyAZu4pQPzGEEe8ijqiP4cKnMrz7-Orercg`
    )
      .then(response => response.json())
      .then(data => console.log(data.results))
      .catch(error => alert(error));
  }

  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Denied");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("POSITION_UNAVAILABLE");
        break;
      case error.TIMEOUT:
        alert("TIMEOUT");
        break;
      case error.UNKOWN_ERROR:
        alert("UNKOWN_ERROR");
        break;
      default:
        alert("default");
    }
  }

  render() {
    return (
      <div className="App">
        <h2>React Geolocation Example</h2>
        <button onClick={this.getLocation}>Get coordinators</button>
        <h4>HTML5 Coordinates</h4>
        <p>Latitue: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <p>Google Maps Rever Geocoding</p>
        <p>Address: {this.state.userAddress}</p>
      </div>
    );
  }
}

export default App;
