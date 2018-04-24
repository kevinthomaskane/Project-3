import React from "react";
import axios from "axios";
import Header from "../Header";
import "./Event.css";
// import MapContainer from "../MapContainer";

class Event extends React.Component {

  state = {
    project: {},
    attendees: [{name: "kevin", image:"https://media.licdn.com/dms/image/C5603AQGPPjFWbcohHA/profile-displayphoto-shrink_200_200/0?e=1529787600&v=beta&t=fANZ1-RmAHSnlN9YR5DIVD5f7KaZgjfwuV4zzowwCDM"}, {name: "Gus", image:"https://media.licdn.com/dms/image/C5603AQGPPjFWbcohHA/profile-displayphoto-shrink_200_200/0?e=1529787600&v=beta&t=fANZ1-RmAHSnlN9YR5DIVD5f7KaZgjfwuV4zzowwCDM"}],
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
          <div className="col m8" id="topSection">
            <h2>{this.state.project.name}</h2><br/>
            <h5>{this.state.project.date} {this.state.project.address} {this.state.project.city} {this.state.project.state}</h5>
            <img className="image" src={this.state.hostImage} /> <p>{this.state.host}</p>
          </div>
          <div className="col m4">
            <div id="map"></div>
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
              <div key={index} className="attendee">
              <img className="image" src={person.image} />
              <p>{person.name}</p>
              </div>
            )
          })}
        </div>
        <div className="row">

        </div>
        
          {/* <h3>Message Board</h3><br/>
            <div id="messageBoard" className="col m12">
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
          <div id="messageSubmit">
              <div className="col m11">
                <input type="text" placeholder="send a message" onChange={this.handleInputChange}/>
                    </div>
                   <div className="col m1">
                  <button class="btn waves-effect waves-light red" onClick={() => {
                  this.handleMessageSubmit(this.props.match.params.id)
                  }}><i class="material-icons">send</i></button>
                   </div>
               </div>
            </div> */}
      </div>
    </div>
    )
  }

};

export default Event;
