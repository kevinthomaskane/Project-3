import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import axios from "axios";
// import mapTest from "../../mapTest.json";
const apiKey = "50074c58887a47f3330613f488693773"

export class MapContainer extends Component {

    state = {
        events: [],
        currentLocation:{lat:34.0622, lng: -118.445}
    };

    onMarkerClick = () => {

    };

    getInfo = () => {
      axios.get("/api/events").then((response) => {
        console.log(response);
        axios.get(`https://freegeoip.net/json/`).then((res) => {
          console.log(res);
          this.setState({
            currentLocation: {
              lat: res.data.latitude,
              lng: res.data.longitude
            },
            events: response.data.data});
        });
      });
    };

      componentDidMount() {
        this.getInfo();
      }

  render() {
    return (
      <Map google={this.props.google}
        initialCenter={this.state.currentLocation}
        zoom={14}>
        {this.state.events.map((even) => {
          return (
            <Marker
              key={even.id}
              title={even.name}
              position={{lat: even.lat, lng:even.lng}}
            />
          );
        })}

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCLk94LTMJRjooWHuL5CAzeCxxSoML927Y"
})(MapContainer)
