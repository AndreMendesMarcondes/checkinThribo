import React from "react";
import "./App.css";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null,
      distanceKilometers: null,
      closerDistance: null,
      largeDistance: null,
      avarageDistance: null,
      fullDistance: null,
      count: 0,
      addresses: [],
      distanceKilometersArr: [],
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates, null, {
        enableHighAccuracy: true,
        timeout: 5 * 10000, // 50 seconds
        maximumAge: 0
      });
    } else {
      alert("Geolocation is not suppoerted by this browser");
    }
  }

  getCoordinates(position) {
    console.log(position)
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    this.reverseGeocodeCoordinates();
  }

  getAdresses(position) {
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
      .then(data => this.setState({ addresses: Array.from(new Set(data.results.map(item => item.formatted_address))) }, this.calcDistance))
      .catch(error => alert(error));
  }

  calcDistance() {
    (async () => {
      const rawResponse = await fetch('http://localhost:8080/api/checkin/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(this.state.addresses)
      });
      const content = await rawResponse.json();
    })();
  }

  getCloserDistance(distance) {
    if (distance < 50) {
      this.setState({
        distanceKilometersArr: this.state.distanceKilometersArr.concat(distance),
        fullDistance: this.state.fullDistance + distance,
        count: this.state.count + 1,
        avarageDistance: parseFloat(this.state.fullDistance / this.state.count).toFixed(2)
      })
      if (this.state.closerDistance == null) {
        this.setState({ closerDistance: distance });
      }
      if (this.state.largeDistance == null) {
        this.setState({ largeDistance: distance });
      }

      if (this.state.largeDistance < distance) {
        this.setState({ largeDistance: distance });
      }
      if (distance < this.state.closerDistance) {
        this.setState({ closerDistance: distance });
      }
    }
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
      <div className="container text-center">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <h2>Local Registrado Mais Perto: </h2>
          <h1>{this.state.avarageDistance ? this.state.avarageDistance + " kilometros" : null}</h1>
          <button onClick={this.getLocation} className="btn btn-primary">Estou próximo da Thribo</button>
        </div>
      </div >
    );
  }
}

export default App;
