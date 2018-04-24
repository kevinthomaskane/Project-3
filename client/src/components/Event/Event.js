import React from "react";
import axios from "axios";
import Header from "../Header";
import MapContainer from "../MapContainer";

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





class Event extends React.Component {

  state = {
    project: {},
    attendees: ["kevin", "gus"],
    message: "",
    messages: ["hey this is a message", "here's another message"],
  }

  componentDidMount = () => {
    var projectId = this.props.match.params.id;
    this.getInfo(projectId);
    this.getMessages(projectId);
  };

  getInfo = (PID) => {
    axios.get("/api/events/" + PID).then((response) => {
      var projectId = this.props.match.params.id;
      console.log("get info response", response)
      this.setState({
        project: response.data
        });
    });
  };

  getMessages = (PID) => {
    axios.get("/api/chat/" + PID).then((response) => {
      var projectId = this.props.match.params.id;
      console.log("this is chat response", response)
      this.setState({messages: response.data})
    })
  };

  handleInputChange = (event) => {
    let message = event.target.value
    this.setState({message: message})
  };

  handleMessageSubmit = (PID) => {
    let username = localStorage.getItem("username");
    let userId = localStorage.getItem("userId");
    axios.post("/api/chat/" + PID, {content: this.state.message, username: username, userId: userId}).then((response) => {
      console.log(response)
    })
  };

  getMap = () => {

  }

  render(){
    return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col m8" style={styles.topSection}>
            <h2>{this.state.project.name}</h2><br/>
            <h5>{this.state.project.date} {this.state.project.address} {this.state.project.city} {this.state.project.state}</h5>
            <img src={this.state.hostImage} /> <p>{this.state.host}</p>
          </div>
          <div className="col m4">
            <div style={styles.map}></div>
          </div>
        </div>
        <div className="row">
        <h3>About this event</h3>
          <p>{this.state.project.description}</p>
        </div>
        <div className="row">
          <h3>Attendees</h3><br/>
          {this.state.attendees.map(function(person, index){
            return (
              <div key={index} style={styles.attendee}>
              <img src={person.image} />
              <p>{person.name}</p>
              </div>
            )
          })}
        </div>
        <div className="row">
          <h3>Message Board</h3><br/>
          <ul className="collection">
          {this.state.messages.map(function(message, index){
            return (
              <li key={index} className="collection-item avatar">
              <img className="circle" src={message.image} />
              <p>{message.content}</p>
              </li>
            )
          })}
          </ul>
          <input type="text" onChange={this.handleInputChange}/>
          <button onClick={() => {
            this.handleMessageSubmit(this.props.match.params.id)
            }}>Send Message</button>
        </div>
      </div>
    </div>
    )
  }

};

export default Event;
