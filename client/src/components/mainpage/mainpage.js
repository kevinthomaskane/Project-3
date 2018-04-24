import React, { Component } from "react";
import Axios from "axios"
import { Link } from "react-router-dom";

class Mainpage extends Component {
    state = {
        events: [],

    };

    componentDidMount() {
        axios.get("/api/events")
            .then(res =>
                this.setState({ events: res })
            )
            .catch(err => console.log(err));

    }

    loadEvents = () => {

    };

    render() {
        return (

            <ul className="collection">
                {this.state.events.map(function (events) {
                    return (
                        <Link>
                            <li className="collection-item avatar">
                                <img className="circle" src={events.image} />
                                <p>{events.content}</p>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        )
    }


}

export default Mainpage;
