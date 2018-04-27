import React, { Component } from "react";
import Axios from "axios"
import { Link } from "react-router-dom";
import { Navbar, Icon, Col, Row, NavItem, CardPanel, Button, MediaBox, Slider, Slide, Parallax } from "react-materialize";
import "./Mainpage.css";
import MapContainer from "../MapContainer";
import ParallaxSlider from "../ParallaxSlider";

class Mainpage extends Component {
    state = {
        events: [ { id: 1, content: "event 1", image: "random.com" }],
        searching: false,
        searchterm: "",
        filtered: [],
        clicked: false

    };

    componentDidMount() {
        Axios.get("/api/events")
            .then(res =>
                this.setState({ events: [] })
            )
            .catch(err => console.log(err));

    }

    loadEvents = () => {

    };

    getFiltered = (sportType) => {
        Axios.get("/api/events/" + sportType).then((response) => {
            this.setState({ events: response.data, clicked: true })
        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmitChange = event => {
        event.preventDefault()
        //    Axios.get("")
    }

    togglesearch = () => {
        this.state.searching ? this.setState({
            searching: false
        }) : this.setState({
            searching: true
        })
    }

    toggleFiltered = (Sports) => {
        this.state.filtered ? this.setState({
            filtered: false
        }) : this.setState({
            filtered: true
        })
    //     after Axios request you would want to set state of events to the results of the request
    }

    render() {
        return (
            <div>
                
                <Row>
                    <Col s={12}>
                        <ParallaxSlider />
                    </Col>
                </Row>
                {/* <Navbar brand='logo' right>
                    {this.state.searching ? <form onSubmit={this.handleSubmitChange} > <input onChange={this.handleInputChange} id="searchbox" name="searchterm" type="text"></input></form> : ""}
                    <NavItem onClick={this.togglesearch}><Icon>search</Icon></NavItem>
                </Navbar> */}

            <Row>
                <Col s={3} >
                <Button className="EventButton" onClick={()=>this.toggleFiltered("Flag Football")}><img className="icon" src={"../images/football.png"}/>Flag Football</Button>
                </Col>
                <Col s={3} >
                <Button className="EventButton" onClick={()=>this.toggleFiltered("Frisbee")}><img className="icon" src={"../images/fris.png"}/>Frisbee</Button>
                </Col>
                <Col s={3} >
                <Button className="EventButton" onClick={()=>this.toggleFiltered("Basketball")}><img className="icon" src={"../images/bball.png"}/>Basketball</Button>
                </Col>
                <Col s={3} >
                <Button className="EventButton" onClick={()=>this.toggleFiltered("Soccer")}><img className="icon" src={"../images/soccer.png"}/>Soccer</Button>
                </Col>
                </Row>

                <Row>
                    {this.state.clicked === false ? this.state.events.map(function (event, index) {
                        if(index <6){
                        return (
                            <Link to={"/event/" + event.id}>
                                <Col s={6}>
                                    <CardPanel className="EventCard">
                                        <img className="circle" src={event.image} />
                                        <p>{event.content}</p>
                                    </CardPanel>
                                </Col>
                            </Link>
                        )}
                    }) : ""}
                    <Col s={6}>
                    <MapContainer />
                    </Col>
                </Row>

            </div>
        )
    }
}

export default Mainpage;
