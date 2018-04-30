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
import ParallaxSlider from "../ParallaxSlider";
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
    this.getFiltered("none")

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
          <Col s={12}>
            <ParallaxSlider />
          </Col>
        </Row>
      <Row>
        <Col s={3}>
          <Button className="EventButton needRight" onClick={() => this.getFiltered("football")}><img className="icon" src={"../images/football.png"}/>Flag Football</Button>
        </Col>
        <Col s={2.4}>
          <Button className="EventButton needLeft" onClick={() => this.getFiltered("frisbee")}><img className="icon" src={"../images/fris.png"}/>Frisbee</Button>
        </Col>
        <Col s={2.4}>
          <Button className="EventButton needLeft" onClick={() => this.getFiltered("basketball")}><img className="icon" src={"../images/bball.png"}/>Basketball</Button>
        </Col>
        <Col s={2.4}>
          <Button className="EventButton needLeft" onClick={() => this.getFiltered("soccer")}><img className="icon" src={"../images/soccer.png"}/>Soccer</Button>
        </Col>
        <Col s={2.4}>
          <Button className="EventButton needLeft" onClick={() => this.getFiltered("none")}><img className="icon" src={"../images/all.svg"}/>All</Button>
        </Col>
      </Row>

      <Row>
        <Col s={6}>
          {
            this.state.clicked === false
              ? this.state.events.map((event, index) => {
                  console.log(event)
                  return (
                  <Link key={event.id} to={"/event/" + event.id + "/" + event.lat + "/"+ event.lng}>
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
          <MapContainer events={this.state.events} currentLocation={this.state.currentLocation}

          />
        </Col>
      </Row>

    </div>)
  }
}

export default Mainpage;
