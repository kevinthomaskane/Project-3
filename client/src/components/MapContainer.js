import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

    onMarkerClick = () => {
        alert("hey");
      };
    
      componentDidMount() {
        setTimeout(() => {
          this.setState({
            on: true
          })
        }, 2000);
      }

  render() {
    return (
      <Map google={this.props.google} zoom={14}>

        {this.state.on ? <Marker onClick={this.onMarkerClick}
                name={'Current location'} /> : null}

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (AIzaSyCLk94LTMJRjooWHuL5CAzeCxxSoML927Y)
})(MapContainer)