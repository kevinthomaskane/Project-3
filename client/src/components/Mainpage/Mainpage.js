import React, {Component} from "react";
import Axios from "axios"
import {Link} from "react-router-dom";
import {
  Navbar,
  Icon,
  Col,
  Row,
  NavItem,
  CardPanel,
  Button
} from "react-materialize";
import "./Mainpage.css";
import MapContainer from "../MapContainer";

const style = {
  width: '50%',
  height: '50%'
};

class Mainpage extends Component {
  state = {
    events: [],
    searching: false,
    searchterm: "",
    filtered: [],
    clicked: false,
    currentLocation: ""

  };

  componentDidMount() {
    Axios.get("/api/events/none").then(res => {
      console.log(res);
      this.setState({events: res.data.data})

    }).catch(err => console.log(err));

  }

  loadEvents = () => {};

  getFiltered = (sportType) => {
    console.log(sportType);
    Axios.get("/api/events/" + sportType).then((response) => {
      Axios.get(`https://freegeoip.net/json/`).then((res) => {
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

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  togglesearch = () => {
    this.state.searching
      ? this.setState({searching: false})
      : this.setState({searching: true})
  }

  toggleFiltered = (Sports) => {
    this.state.filtered
      ? this.setState({filtered: false})
      : this.setState({filtered: true})
    //     after Axios request you would want to set state of events to the results of the request
  }

  render() {
    return (
    <div id="content">
      <Row>
        <Col s={3}>
          <Button className="EventButton" onClick={() => this.getFiltered("football")}><img className="icon" src={"../images/football.png"}/>Flag Football</Button>
        </Col>
        <Col s={3}>
          <Button className="EventButton" onClick={() => this.getFiltered("frisbee")}><img className="icon" src={"../images/fris.png"}/>Frisbee</Button>
        </Col>
        <Col s={3}>
          <Button className="EventButton" onClick={() => this.getFiltered("basketball")}><img className="icon" src={"../images/bball.png"}/>Basketball</Button>
        </Col>
        <Col s={3}>
          <Button className="EventButton" onClick={() => this.getFiltered("soccer")}><img className="icon" src={"../images/soccer.png"}/>Soccer</Button>
        </Col>
      </Row>

      <Row>
        <Col s={6}>
          {
            this.state.clicked === false
              ? this.state.events.map(function(event, index) {
                  return (
                  <Link key={event.id} to={"/event/" + event.id}>
                    <Col s={12}>
                      <CardPanel className="EventCard">
                        <h2>{event.name}</h2>
                        <img className="circle" src={event.image}/>
                        <p>{event.description}</p>
                      </CardPanel>
                    </Col>
                  </Link>)
              })
              : ""
          }
        </Col>

        <Col s={6}>
          <MapContainer events={this.state.events} currentLocation={this.state.currentLocation}/>
        </Col>
      </Row>

    </div>)
  }
}

export default Mainpage;
