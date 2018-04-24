import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import axios from "axios";

export class MapContainer extends Component {

    state = {
        address: ""
    };

    onMarkerClick = () => {
        alert("hey");
      };

      getInfo = () => {
        axios.get("/api/events").then((response) => {
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            let addy = `${response.data[i].address} ${response.data[i].city} ${response.data[i].state}`;
            console.log(addy);
          }
          //
          // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addy}CA&key=AIzaSyDKYcYNqOJapazYjjFKVq3t94ljuBhx67o`
          // ).then((response) => {
          //   console.log(response);
          //   this.setState({ address : {
          //     lat: response.data.results[0].geometry.location.lat,
          //     lng: response.data.results[0].geometry.location.lng
          //   }
          //   })
          // })
        });
      };

      componentDidMount() {
        this.getInfo();
      }

  render() {
    return (
      <Map google={this.props.google} zoom={14}>



      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCLk94LTMJRjooWHuL5CAzeCxxSoML927Y"
})(MapContainer)
