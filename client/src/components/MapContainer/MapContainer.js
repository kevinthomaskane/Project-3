import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import axios from "axios";
const apiKey = "50074c58887a47f3330613f488693773"

export class MapContainer extends Component {

  state = {
      events: [],
      currentLocation:{lat:34.0622, lng: -118.445}
  };

  componentWillMount () {
    if(this.props.events !== undefined){
      this.setState({
        currentLocation:{
          lat: this.props.events.lat,
          lng: this.props.events.lng
        }
      });
    } else {
      console.log("here");
    }
  };

  render() {
    return (
      <Map google={this.props.google}
        initialCenter={this.state.currentLocation}
        zoom={14}>
        {this.props.isEvent=== true ?

          <Marker
            title={this.props.events.name}
            position={{lat:this.props.events.lat, lng:this.props.events.lng}}
              />
          :this.props.events === undefined ? null:this.props.events.map((even) => {
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
