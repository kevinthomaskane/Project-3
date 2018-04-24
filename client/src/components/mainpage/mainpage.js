import React, { Component } from "react";
import Axios from "axios"
import { Link } from "react-router-dom";
import { Navbar, Icon, Col, Row, NavItem, CardPanel } from "react-materialize"

class Mainpage extends Component {
    state = {
        events: [],
        searching: false,
        searchterm: ""

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


    render() {
        return (
            <div>
                <Navbar brand='logo' right>

                    {this.state.searching ? <form onSubmit={this.handleSubmitChange} > <input onChange={this.handleInputChange} id="searchbox" name="searchterm" type="text"></input></form> : ""}
                    <NavItem onClick={this.togglesearch}><Icon>search</Icon></NavItem>
                    <NavItem><Icon>refresh</Icon></NavItem>
                </Navbar>

                <Row>
                    <Col s={12} m={6}>
                        <CardPanel className="teal lighten-4 black-text">
                            <span>Event Image</span>
                        </CardPanel>
                    </Col>




                    <Col s={12} m={6}>
                        <CardPanel className="teal lighten-4 black-text">
                            <span>Event Image</span>
                        </CardPanel>
                    </Col>


                </Row>

                <Row>
                    <Col s={12} m={6}>
                        <CardPanel className="teal lighten-4 black-text">
                            <span>Event Image</span>
                        </CardPanel>
                    </Col>


                    <Col s={12} m={6}>
                        <CardPanel className="teal lighten-4 black-text">
                            <span>Event Image</span>
                        </CardPanel>
                    </Col>

                </Row>

                <ul className="collection">
                    {this.state.events.map(function (event) {
                        return (
                            <Link to={"/event/" + event.id}>
                                <li className="collection-item avatar">
                                    <img className="circle" src={event.image} />
                                    <p>{event.content}</p>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        )
    }
}








export default Mainpage;
