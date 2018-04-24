import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import axios from "axios";
import mapTest from "../../../mapTest.json";

// const address = `${mapTest[i].streetAddress} ${mapTest[i].city} ${mapTest[i].state} ${mapTest[i].zip}`;

export class MapContainer extends Component {

    state = {
        "type" : "",
        "streetAddress": "",
        "city": "",
        "state": "",
        "zip": "",
        "gameStatus": "",
        on: false
      };

    onMarkerClick = () => {
        alert("hey");
      };

      componentDidMount() {

        let addy = `${this.state.streetAddress} ${this.state.city} ${this.state.city} ${this.state.zip}`;

          getInfo = () => {
            axios.get("https://maps.googleapis.com/maps/api/geocode/json?"+addy+"CA&key=AIzaSyDKYcYNqOJapazYjjFKVq3t94ljuBhx67o"
            ).then((response) => {
              console.log(response);
              this.setState({  address = this.response.geometry.location.lat + this.response.geometry.location.lng  })
            })
          };

        setTimeout(() => {
          this.setState({
            on: true,
            type: this.state.type,
          })
        }, 2000);
      }

  render() {
    return (
      <Map google={this.props.google} zoom={14}>

        {this.state.on ? <Marker onClick={this.onMarkerClick}
                name={'Current location'} /> : null}

        {this.state.on ? <Marker onClick={this.onMarkerClick}
                name={address} /> : null}

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (AIzaSyCLk94LTMJRjooWHuL5CAzeCxxSoML927Y)
})(MapContainer)
