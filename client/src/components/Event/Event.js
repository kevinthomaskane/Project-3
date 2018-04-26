import React from "react";
import axios from "axios";
import Header from "../Header";
import {Link} from "react-router-dom";
import "./Event.css";
import MapContainer from "../MapContainer";

const styles = {
  map: {
    width: 300,
    height: 300
  }
}

class Event extends React.Component {

  state = {
    currentEvent: {},
    date: "",
    message: "",
    hosts: [],
    messages: [],
    attendees: []
  }

  componentDidMount = () => {
    let eventId = this.props.match.params.id;
    this.getInfo(eventId);
  };

  getInfo = (EID) => {
    axios.get("/api/event/" + EID).then((data) => {
      let eventId = this.props.match.params.id;
      axios.get("/api/chat/" + EID).then((response) => {
        this.setState({messages: response.data, attendees: data.data.attendees.Users, currentEvent: data.data.attendees, date: data.data.attendees.date.split("T")[0], hosts: data.data.host});
        console.log(data)
      })
    });
  };

  getHostInfo = () => {
    let userArray =  this.state.attendees
    let hostArray = this.state.hosts
    let hosts = [];
    for (let i = 0; i < userArray.length; i++){
      for (let j = 0; j < hostArray.length; j++){
        if (userArray[i].id === hostArray[j].userId){
          console.log(userArray[i])
          hosts.push(userArray[i]);
        }
      }
    }
    console.log("hosts", hosts)
    return (hosts.map((element) =>{
      console.log(element)
      return (
      <div>
        <img src={element.image} /> 
        <h5>{element.username}</h5>
      </div>
      )
    })
  )
  }

  filterHost = () => {
    let userArray =  this.state.attendees
    let hostArray = this.state.hosts
    let tmp;
    for (let i = 0; i < userArray.length; i++){
      for (let j = 0; j < hostArray.length; j++){
        if (userArray[i].id === hostArray[j].userId){
          tmp = i
          userArray.splice(i, 1);
        }
      }
    }
    return (
    userArray.map(function(person, index){
      return (
        <div key={index} className="attendee">
          <img className="image" src={person.image} />
          <Link to={"/profile/" + person.userId}><p>{person.username}</p></Link>
        </div>
            )
      })
    )
  }

  getMessages = (EID) => {
    axios.get("/api/chat/" + EID).then((response) => {
      let eventId = this.props.match.params.id;
      console.log("this is chat response", response);
      this.setState({messages: response.data.content});
    })
  };

  joinEvent = (EID) => {
    let userId = localStorage.getItem("user_id");
    axios.post("/api/join/" + EID, {userId: userId}).then((response) => {
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
      <div className="container">
        <div className="row">
          <div className="col m8" id="topSection">
            <h2>{this.state.currentEvent.name}</h2><br/>
            <h5>{this.state.date} {this.state.currentEvent.address} </h5>
            {this.getHostInfo()}<br/>
            <button onClick={() => {
              this.joinEvent(this.props.match.params.id)
            }}id="join">Join this event</button>
          </div>
          <div className="col m4">
            <div id="map">
            <MapContainer eventLocation={this.state.currentEvent} style={styles.map}/>
            </div>
          </div>
        </div>  
        <div className="row">
          <h5>About this event</h5>
            <div class="col m12">
              <p>{this.state.currentEvent.description}</p>
            </div>
        </div>
        <div className="row">
          <h5>Attendees</h5><br/>
            <div class="col m12">
            {/* {this.filterHost()} */}
              {/* {this.state.attendees.map(function(person, index){
                return (
                  <div key={index} className="attendee">
                    <img className="image" src={person.image} />
                    <Link to={"/profile/" + person.userId}><p>{person.username}</p></Link>
                  </div>
                      )
                })} */}
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
                  <textarea value={this.state.message} onChange={this.handleInputChange} placeholder="send a message">
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
