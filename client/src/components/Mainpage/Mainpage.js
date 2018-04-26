import React, { Component } from "react";
import Axios from "axios"
import { Link } from "react-router-dom";
import { Navbar, Icon, Col, Row, NavItem, CardPanel, Button } from "react-materialize"

class Mainpage extends Component {
    state = {
        events: [{ id: 1, content: "event 1", image: "random.com" }],
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
        Axios.get("/api/events/" + Sports).then((response) => {
            this.setState({ events: response.data, clicked: true })
        })
    }

    render() {
        return (
            <div>

                <Row>
                    <Col s={3} >
                        <Button onClick={() => this.toggleFiltered("Flag Football")}>Flag Football</Button>
                    </Col>
                    <Col s={3} >
                        <Button onClick={() => this.toggleFiltered("Frisbee")}>Frisbee</Button>
                    </Col>
                    <Col s={3} >
                        <Button onClick={() => this.toggleFiltered("Basketball")}>Basketball</Button>
                    </Col>
                    <Col s={3} >
                        <Button onClick={() => this.toggleFiltered("Soccer")}>Soccer</Button>
                    </Col>
                </Row>

                <Row>
                    {this.state.clicked === false ? this.state.events.map(function (event, index) {
                        if (index < 6) {
                            return (
                                <Link to={"/event/" + event.id}>
                                    <Col s={12} m={6}>
                                        <CardPanel className="teal lighten-4 black-text">
                                            <img className="circle" src={event.image} />
                                            <p>{event.content}</p>
                                        </CardPanel>
                                    </Col>
                                </Link>
                            )
                        }
                    }) : ""}
                </Row>

            </div>
        )
    }
}

export default Mainpage;
