import {Map, InfoWindow, Marker, GoogleApiWrapper, CustomMarker} from 'google-maps-react';
import React, { Component } from 'react';
import axios from "axios";
// import mapTest from "../../mapTest.json";
import "./MapContainer.css";
const apiKey = "50074c58887a47f3330613f488693773"

export class MapContainer extends Component {

  state = {
      events: [],
      currentLocation:{},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
  };


  onMarkerClick = (props, marker, e) => {
    console.log(props);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }


  componentWillMount () {
    
    console.log(this.props.currentLocation, this.props.lat)
    if (this.props.lat) {
      this.setState({
        currentLocation:{lat:parseFloat(this.props.lat), lng: parseFloat(this.props.lng)}
      })
    }
    else if (this.props.currentLocation) {
      console.log(this.props.currentLocation)
      this.setState({
        currentLocation: this.props.currentLocation //geolocation here
      })
    }
    else {
      window.location.reload();
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
            position={{lat:this.props.events.lat, lng: this.props.events.lng}}
              />
            :this.props.events === undefined ? null:
             this.props.events.map((even) => {

                // if (even.sportType === "basketball" | "bball" | "Basketball" | "b-ball"){
                //   this.props.google.maps.icon.url = "../../images/bball.png"
                // }

          return (
            <Marker
              address={even.address}
              description={even.description}
              date={even.date}
              key={even.id}
              title={even.name}
              position={{lat: even.lat, lng:even.lng}}
              onClick={this.onMarkerClick}
              icon={{
                url: even.sportType === "basketball" ? "../../images/bball.png": 
                even.sportType === "football" ? "../../images/football.png": 
                even.sportType === "soccer" ? "../../images/soccer.png":
                even.sportType === "frisbee" ? "../../images/fris.png": "../../images/all.svg" ,
                anchor: new this.props.google.maps.Point(16,16),
                scaledSize: new this.props.google.maps.Size(24,24)  
              }}
            />

          );
        })}

        <InfoWindow
          id="infoWindow"
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <span id="infoWindowTitle">{this.state.selectedPlace.title}</span><br/><br/>
              <span id="infoWindowDesc">{this.state.selectedPlace.description}</span>
              <span id="infoWindowDate">{this.state.selectedPlace.date}</span>
              <p>{this.state.selectedPlace.address}</p>
            </div>
        </InfoWindow>
      </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCLk94LTMJRjooWHuL5CAzeCxxSoML927Y"
})(MapContainer)
