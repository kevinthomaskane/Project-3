import React, {Component} from "react";
import Axios from "axios"
import {Link} from "react-router-dom";

class Mainpage extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    Axios.get("/api/events").then(res => this.setState({
      events: [
        {
          id: 1,
          content: "event 1",
          image: "random.com"
        }
      ]
    })).catch(err => console.log(err));

  }

  loadEvents = () => {};

  render() {
    return (<ul className="collection">
      {
        this.state.events.map(function(event, index) {
          return (<Link to={"/event/" + event.id}>
            <li key={index} className="collection-item avatar">
              <img className="circle" src={event.image}/>
              <p>{event.content}</p>
            </li>
          </Link>)
        })
      }
    </ul>)
  }

}

export default Mainpage;
