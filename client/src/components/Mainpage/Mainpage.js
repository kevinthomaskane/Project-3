import React, { Component } from "react";
import Axios from "axios"
import { Link } from "react-router-dom";
import { Navbar, Icon, Col, Row, NavItem, CardPanel, Button } from "react-materialize"

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
                {/* <Navbar brand='logo' right>
                    {this.state.searching ? <form onSubmit={this.handleSubmitChange} > <input onChange={this.handleInputChange} id="searchbox" name="searchterm" type="text"></input></form> : ""}
                    <NavItem onClick={this.togglesearch}><Icon>search</Icon></NavItem>
                </Navbar> */}


                <Button onClick={()=>this.toggleFiltered("Flag Football")}>Flag Football</Button>
                <Button onClick={()=>this.toggleFiltered("Frisbee")}>Frisbee</Button>
                <Button onClick={()=>this.toggleFiltered("Basketball")}>Basketball</Button>
                <Button onClick={()=>this.toggleFiltered("Soccer")}>Soccer</Button>
        <Row>
             <Col s={3} >
                <Button className="EventButton" onClick={this.toggleFiltered}>Flag Football</Button>
             </Col>
             <Col s={3} >
                <Button className="EventButton" onClick={this.toggleFiltered}>Frisbee</Button>
             </Col>
             <Col s={3} >
                <Button className="EventButton" onClick={this.toggleFiltered}>Basketball</Button>
             </Col>
             <Col s={3} >
                <Button className="EventButton" onClick={this.toggleFiltered}>Soccer</Button>
             </Col>
        </Row>

                <Row>
                    {this.state.clicked === false ? this.state.events.map(function (event, index) {
                        if(index <6){
                        return (
                            <Link to={"/event/" + event.id}>
                                <Col s={12} m={6}>
                                    <CardPanel className="teal lighten-4 black-text">
                                        <img className="circle" src={event.image} />
                                        <p>{event.content}</p>
                                    </CardPanel>
                                </Col>
                            </Link>
                        )}
                    }) : ""}
                </Row>

            </div>
        )
    }
}

export default Mainpage;
