import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import axios from "axios";


export class MapContainer extends Component {
  
  
  
  
  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node= ReactDOM.findDOMNode(mapRef);

      let zoom =14;
      let lat = {this.state.curentLocation}
    }
  }

    // state = {
    //     address: ""
    // };

    onMouseoverMarker = (props, marker, e) => {

    }


      getInfo = () => {
        axios.get("/api/events").then((response) => {
          console.log(response.data);
        });
      };

      componentDidMount() {
        this.getInfo();
      }

  render() {
    return (
      <Map google={this.props.google} zoom={14}>

        {this.state}

        <Marker 
          title={'Current Location'}
          position={'Current Location'}
        />

       

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCLk94LTMJRjooWHuL5CAzeCxxSoML927Y"
})(MapContainer)
