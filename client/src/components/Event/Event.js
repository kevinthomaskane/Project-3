import React from "react";
import {Modal} from "react-materialize"
import axios from "axios";
import Header from "../Header";
import {Link} from "react-router-dom";
import "./Event.css";
import MapContainer from "../MapContainer";
import Invitation from "../Invitation";

const styles = {
  map: {
    width: 300,
    height: 300
  }
}

let win1251decoder = new TextDecoder('windows-1251');

class Event extends React.Component {

  state = {
    currentEvent: {},
    date: "",
    message: "",
    hosts: [],
    messages: [],
    attendees: [],
    allUsers: [],
  }

  componentDidMount = () => {
    let eventId = this.props.match.params.id;
    this.getInfo(eventId);

  };

  getInfo = (EID) => {
    axios.get("/api/event/" + EID).then((data) => {
      let eventId = this.props.match.params.id;
      axios.get("/api/chat/" + EID).then((response) => {
        axios.get("/api/allUsers").then((third)=>{
          console.log(data.data);
          this.setState({messages: response.data, attendees:
          data.data.attendees.Users, currentEvent: data.data.attendees,
          date: data.data.attendees.date.split("T")[0],
          hosts: data.data.host, allUsers: third.data});
        })
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
          hosts.push(userArray[i]);
        }
      }
    }
    return (hosts.map((element) =>{
      return (
      <div key={element.id}>
        <img id="hostImage" src={element.image === null ? "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png" : `data:image/${element.ext};base64,${element.image}`} />
        <span id="hostName">{element.username} (Host)</span>
      </div>
      )
    })
  )
  }

  filterHost = () => {
    let emptyArray = [];
    let userArray = emptyArray.concat(this.state.attendees);
    let hostArray = this.state.hosts
    for (let i = 0; i < userArray.length; i++){
      for (let j = 0; j < hostArray.length; j++){
        if (userArray[i].id === hostArray[j].userId){
          userArray.splice(i, 1);
        }
      }
    }
    return (
    userArray.map(function(person, index){
      console.log(person.image);
      return (
        <div key={index} className="attendee">
          <img className="image" src={person.image === null ? "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png" : `data:${person.image.type};base64,${person.image.data.toString("base64")}`} />
          <Link to={"/profile/" + person.userId}><p>{person.username}</p></Link>
        </div>
            )
      })
    );
  };

  getMessages = (EID) => {
    axios.get("/api/chat/" + EID).then((response) => {
      let eventId = this.props.match.params.id;
      this.setState({messages: response.data.content});
    })
  };

  joinEvent = (EID) => {
    let userId = localStorage.getItem("user_id");
    axios.post("/api/join/" + EID, {userId: userId}).then((response) => {
      let attendees = this.state.attendees;
      attendees.push(response.data);
      this.setState({attendees: attendees})
    });
  };


  handleInputChange = (event) => {
    let message = event.target.value;
    this.setState({message: message});
  };

  handleMessageSubmit = (EID) => {
    let username = localStorage.getItem("username");
    axios.post("/api/chat/", {content: this.state.message, username: username, event_id: EID}).then((response) => {
      let messages = this.state.messages;
      let blank = "";
      this.state.message.length > 0 ? (messages.push(response.data), console.log("greater than 0"), this.setState({messages: messages, message: blank})): console.log("can't send blank message");
    });
  };

  checkHost = () => {
    let user_id = localStorage.getItem("user_id")
    let hostArray = this.state.hosts
    let found = false;
    for (let i = 0; i < hostArray.length; i++){
      if (hostArray[i].userId === +user_id){
        found = true
      }
    }
    if (!found){
      return (
        <button onClick={() => {
          this.joinEvent(this.props.match.params.id);
        }}id="join">Join this event</button>
      )
    } else {
      return (
        <Modal trigger={<button>Invite another host</button>}>
        {this.state.allUsers.filter((user)=>{
          return user.username !== localStorage.getItem("username")
        }).map((element) =>{
          return (
            <h5 id={element.id}>{element.username} <button onClick={() => {
              this.inviteHost(this.props.match.params.id, element.id)
            }}>send invitation</button></h5>
          )
        })}
        </Modal>
      );
    };
  };

  inviteHost = (EID, userId) =>{
    axios.post("/api/addHost/" + EID, {userId: userId}).then((response) => {
    });
  };

  inviteUser = (EID, username) => {
    axios.post("/api/invite/", {eventId: EID, eventName: this.state.currentEvent.name, username: username, userId: localStorage.getItem("user_id"), sender: localStorage.getItem("username")}).then((response) => {
    });
  };


  render(){

    return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col m8" id="topSection">
            <h2>{this.state.currentEvent.name}</h2>
            <p><i class="material-icons">date_range</i>{this.state.date}</p><br/>
            <p id="address"><i class="material-icons">add_location</i>{this.state.currentEvent.address} </p>
            {this.getHostInfo()}<br/>
            {this.checkHost()}
            <Modal trigger={<button>Share with another user!</button>}>
            {this.state.allUsers.filter((user) => {
              return user.username !== localStorage.getItem("username");
            }).map((element) => {
              return <p>{element.username} <button id={element.username} onClick={() => {
                this.inviteUser(this.props.match.params.id, element.username)
              }}>Invite this user</button></p>
            })}
            </Modal>
          </div>
          <div id="mapLocation" className="col m4">
            <div id="map">
            <MapContainer isEvent={true} events={this.state.currentEvent}  style={styles.map}/>
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
        <Invitation eventId={this.props.match.params.id}/>
          <h5>Attendees</h5><br/>
            <div class="col m12">
            {this.filterHost()}
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
                        <img className="messageImg" src={this.state.attendees.filter((item) => {
                          return item.username === message.username
                        }).map(function(element){
                          console.log("image", element.image)
                          return (element.image === null ?
                          "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png" : element.image)
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
