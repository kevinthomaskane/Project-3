import React from "react";
import axios from "axios";

const styles = {

  map: {
    height: 300,
    backgroundColor: "red"
  },

  topSection: {
    height: 300,
    backgroundColor: "gray"
  },

  attendee: {
    width: 150,
    height: 200,
    border: "solid 1px black",
    display: "inline-block",
    margin: "10px",
    borderRadius: 5

  },

  image: {

  }};



// var projectId = this.props.match.params.id;

class Event extends React.Component {

  state = {
    project: {},
    attendees: ["kevin", "gus"],
    message: "",
    messages: ["hey this is a message", "here's another message"],
    location: {
      address: "",
      city: "",
      state: "",
      zip: ""
    }
  }

  componentDidMount = () => {
    this.getInfo(1);
    this.getMessages(1);
  };

  getInfo = (PID) => {
    console.log("here")
    axios.get("/api/events/" + PID).then((response) => {
      console.log(response)
      this.setState({
        project: response
        })
    })
  };

  getMessages = (PID) => {
    axios.get("/api/chat/" + PID).then((response) => {
      this.setState({messages: response.messages})
    })
  };

  handleInputChange = (event) => {
    let message = event.target.value
    this.setState({message: message})
  };

  handleMessageSubmit = (PID) => {
    axios.post("/api/chat/" + PID, {content: this.state.message}).then((response) => {
      console.log(response)
    })
  };

  getMap = () => {

  }

  render(){
    return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col m8" style={styles.topSection}>
            <h2>{this.state.name}</h2><br/>
            <h5>{this.state.date} {this.state.location.address} {this.state.location.city} {this.state.location.state}</h5>
            <img src={this.state.hostImage} /> <p>{this.state.host}</p>
          </div>
          <div className="col m4">
            <div style={styles.map}></div>
          </div>
        </div>
        <div className="row">
        <h3>About this event</h3>
          <p>{this.state.description}</p>
        </div>
        <div className="row">
          <h3>Attendees</h3><br/>
          {this.state.attendees.map(function(person){
            return (
              <div style={styles.attendee}>
              <img src={person.image} /> 
              <p>{person.name}</p>
              </div>
            )
          })}
        </div>
        <div className="row">
          <h3>Message Board</h3><br/>
          <ul className="collection">
          {this.state.messages.map(function(message){
            return (
              <li className="collection-item avatar">
              <img className="circle" src={message.image} /> 
              <p>{message.content}</p>
              </li>
            )
          })}
          </ul>
          <input type="text" onChange={this.handleInputChange}/>
          <button onClick={() => {
            this.handleMessageSubmit()
            }}>Send Message</button>
        </div>
      </div>
    </div>
    )
  }
  
};

export default Event;