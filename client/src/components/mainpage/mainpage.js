import React, { Component } from "react";
import Axios from "axios"
import { Link } from "react-router-dom";
import { Navbar, Icon, Col, Row, NavItem, CardPanel, Button } from "react-materialize"

class Mainpage extends Component {
    state = {
        events: [{ id: 1, content: "event 1", image: "random.com" }, { id: 1, content: "event 2", image: "random.com" }, { id: 1, content: "event 3", image: "random.com" }],
        searching: false,
        searchterm: "",
        filtered: [],
        clicked: false

    };

    componentDidMount() {
        Axios.get("/api/events")
            .then(res =>
                this.setState({ events: [{ id: 1, content: "event 1", image: "random.com" }] })
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

    toggleFiltered = () => {
        this.state.filtered ? this.setState({
            filtered: false
        }) : this.setState({
            filtered: true
        })
    }

    render() {
        return (
            <div>
                <Navbar brand='logo' right>
                    {this.state.searching ? <form onSubmit={this.handleSubmitChange} > <input onChange={this.handleInputChange} id="searchbox" name="searchterm" type="text"></input></form> : ""}
                    <NavItem onClick={this.togglesearch}><Icon>search</Icon></NavItem>
                </Navbar>

                <Button onClick={this.toggleFiltered}>Flag Football</Button>
                <Button onClick={this.toggleFiltered}>Frisbee</Button>
                <Button onClick={this.toggleFiltered}>Basketball</Button>
                <Button onClick={this.toggleFiltered}>Soccer</Button>

                <Row>
                    {this.state.clicked === false ? this.state.events.map(function (event) {
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
                    }) : ""}
                </Row>

                {/* <Row>
                    {this.state.toggleFiltered === false ? this.state.events.map(function (event) {
                        return (
                            <Link to={"/event/" + event.id}>
                                <Button onClick={this.toggleFiltered}>Flag Football</Button>
                                <Button onClick={this.toggleFiltered}>Frisbee</Button>
                                <Button onClick={this.toggleFiltered}>Basketball</Button>
                                <Button onClick={this.toggleFiltered}>Soccer</Button>
                            </Link>
                        )
                    }) : ""}
                </Row> */}
            </div>
        )
    }
}

export default Mainpage;
