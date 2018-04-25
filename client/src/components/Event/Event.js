import React from "react";
import axios from "axios";
import Header from "../Header";
import {Link} from "react-router-dom";
import "./Event.css";
// import MapContainer from "../MapContainer";

class Event extends React.Component {

  state = {
    project: {},
    date: "",
    attendees: [{username: "kevinthomaskane", image:"https://media.licdn.com/dms/image/C5603AQGPPjFWbcohHA/profile-displayphoto-shrink_200_200/0?e=1529787600&v=beta&t=fANZ1-RmAHSnlN9YR5DIVD5f7KaZgjfwuV4zzowwCDM", userId: 1}, {username: "Gus", image:"https://media.licdn.com/dms/image/C5603AQGPPjFWbcohHA/profile-displayphoto-shrink_200_200/0?e=1529787600&v=beta&t=fANZ1-RmAHSnlN9YR5DIVD5f7KaZgjfwuV4zzowwCDM"}],
    message: "",
    messages: ["hey this is a message", "here's another message"],
  }

  componentDidMount = () => {
    let eventId = this.props.match.params.id;
    this.getInfo(eventId);
  };

  getInfo = (EID) => {
    axios.get("/api/events/" + EID).then((data) => {
      let eventId = this.props.match.params.id;
      axios.get("/api/chat/" + EID).then((response) => {
        this.setState({messages: response.data, project: data.data, date: data.data.date.split("T")[0]});
      })
    });
  };

  getMessages = (EID) => {
    axios.get("/api/chat/" + EID).then((response) => {
      let eventId = this.props.match.params.id;
      console.log("this is chat response", response);
      this.setState({messages: response.data.content});
    })
  };

  joinEvent = (EID) => {
    let username = localStorage.getItem("username");
    axios.put("/api/join/" + EID, {username: username}).then((response) => {
      let attendees = this.state.attendees;
      attendees.push(response.data.username);
      this.setState({attendees: attendees})
    });
  };


  handleInputChange = (event) => {
    let message = event.target.value;
    this.setState({message: message});
  };

  handleMessageSubmit = (EID) => {
    let username = localStorage.getItem("username");
    axios.post("/api/chat/", {content: this.state.message, username: "kevinthomaskane", event_id: EID}).then((response) => {
      let messages = this.state.messages;
      let blank = "";
      this.state.message.length > 0 ? (messages.push(response.data), console.log("greater than 0"), this.setState({messages: messages, message: blank})): console.log("can't send blank message");
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
          <div className="col m8" id="topSection">
            <h2>{this.state.project.name}</h2><br/>
            <h5>{this.state.date} {this.state.project.address} </h5>
            <img src={this.state.hostImage} /> {this.state.host}Host is this name<br/>
            <button onClick={() => {
              this.joinEvent(this.props.match.params.id)
            }}id="join">Join this event</button>
          </div>
          <div className="col m4">
            <div id="map"></div>
          </div>
        </div>
        <div className="row">
          <h5>About this event</h5>
            <div class="col m12">
              <p>{this.state.project.description}</p>
            </div>
        </div>
        <div className="row">
          <h5>Attendees</h5><br/>
            <div class="col m12">
              {this.state.attendees.map(function(person, index){
                return (
                  <div key={index} className="attendee">
                    <img className="image" src={person.image} />
                    <Link to={"/profile/" + person.userId}><p>{person.username}</p></Link>
                  </div>
                      )
                })}
            </div>
        </div>
        <div className="row">
        <h5>Message Board</h5><br/>
          <div className="col m12">
              <div id="messageBoard">
                <ul>
                  {this.state.messages.map((message, index) => {
                    return (
                      <li key={index}>
                      <div className="messageBody">
                        <img className="messageImg" src={this.state.attendees.filter(function(item){
                          return item.username === message.username
                        }).map(function(element){
                          return element.image
                        })}/> <span className="usernameMessage">{message.username}</span><br/>
                        <span className="message">{message.content}</span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
                <div id="messageSubmit">
                  <textarea onChange={this.handleInputChange} placeholder="send a message">
                  </textarea>
                  <button class="blue" onClick={() => {
                  this.handleMessageSubmit(this.props.match.params.id)
                  }}><i class="material-icons">send</i></button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

};

export default Event;
