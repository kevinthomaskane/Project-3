import React from "react";
import {
  Modal,
  Collection,
  CollectionItem,
  Navbar,
  Icon,
  Col,
  Row,
  CardPanel,
  Button
} from "react-materialize";
import axios from "axios";
import Header from "../Header";
import { Link } from "react-router-dom";
import "./Event.css";
import MapContainer from "../MapContainer";
import Invitation from "../Invitation";

class Event extends React.Component {
  state = {
    currentEvent: {},
    date: "",
    message: "",
    hosts: [],
    messages: [],
    attendees: [],
    allUsers: [],
    joined: false
  };

  componentDidMount = () => {
    let eventId = this.props.match.params.id;
    this.getInfo(eventId);
  };

  getInfo = EID => {
    let joined = false;
    axios.get("/api/event/" + EID).then(data => {
      for (let i = 0; i < data.data.attendees.Users.length; i++) {
        if (
          data.data.attendees.Users[i].username ===
          localStorage.getItem("username")
        ) {
          joined = true;
        }
      }
      let eventId = this.props.match.params.id;
      axios.get("/api/chat/" + EID).then(response => {
        axios.get("/api/allUsers").then(third => {
          this.setState({
            messages: response.data,
            attendees: data.data.attendees.Users,
            currentEvent: data.data.attendees,
            date: data.data.attendees.date.split("T")[0],
            hosts: data.data.host,
            allUsers: third.data,
            joined: joined
          });
        });
      });
    });
  };

  getHostInfo = () => {
    let userArray = this.state.attendees;
    let hostArray = this.state.hosts;
    let hosts = [];
    for (let i = 0; i < userArray.length; i++) {
      for (let j = 0; j < hostArray.length; j++) {
        if (userArray[i].id === hostArray[j].userId) {
          hosts.push(userArray[i]);
        }
      }
    }
    return hosts.map(element => {
      return (
        <div key={element.username} class="host">
          <img
            id="hostImage"
            src={
              element.image === null
                ? "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"
                : `data:image/${element.ext};base64,${element.image}`
            }
          />
          <span id="hostName">
            <Link to={"/viewpage/" + element.id}>
              <p>{element.username}</p>
            </Link>{" "}
            (Host)
          </span>
        </div>
      );
    });
  };

  filterHost = () => {
    let emptyArray = [];
    let userArray = emptyArray.concat(this.state.attendees);
    let hostArray = this.state.hosts;
    for (let i = 0; i < userArray.length; i++) {
      for (let j = 0; j < hostArray.length; j++) {
        if (userArray[i].id === hostArray[j].userId) {
          userArray.splice(i, 1);
        }
      }
    }
    return userArray.map(function(person, index) {
      return (
        <div key={index} className="attendee">
          <img
            className="image"
            src={
              person.image === null
                ? "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"
                : `data:image/${person.ext};base64,${person.image}`
            }
          />
          <Link to={"/viewpage/" + person.id}>
            <p>{person.username}</p>
          </Link>
        </div>
      );
    });
  };

  joinEvent = EID => {
    let userId = localStorage.getItem("user_id");
    axios.post("/api/join/" + EID, { userId: userId }).then(response => {
      let attendees = this.state.attendees;
      attendees.push(response.data);
      this.setState({ attendees: attendees, joined: true });
      this.getInfo(EID);
    });
  };

  handleInputChange = event => {
    let message = event.target.value;
    this.setState({ message: message });
  };

  handleMessageSubmit = EID => {
    let username = localStorage.getItem("username");
    axios
      .post("/api/chat/", {
        content: this.state.message,
        username: username,
        event_id: EID
      })
      .then(response => {
        let messages = this.state.messages;
        let blank = "";
        this.state.message.length > 0
          ? (messages.push(response.data),
            console.log("greater than 0"),
            this.setState({ messages: messages, message: blank }))
          : console.log("can't send blank message");
      });
  };

  checkHost = () => {
    let user_id = localStorage.getItem("user_id");
    let hostArray = this.state.hosts;
    let found = false;
    for (let i = 0; i < hostArray.length; i++) {
      if (hostArray[i].userId === +user_id) {
        found = true;
      }
    }
    if (!found) {
      return this.state.joined ? (
        <div>
          <Button
            className="cardBtn"
            disabled={this.state.joined}
            onClick={() => {}}
          >
            You are going
          </Button>{" "}
          <Button
            className="cardBtn"
            onClick={() => {
              this.leaveEvent(this.props.match.params.id, user_id);
            }}
          >
            Cancel RSVP
          </Button>
        </div>
      ) : (
        <Button
          className="cardBtn"
          disabled={this.state.joined}
          onClick={() => {
            this.joinEvent(this.props.match.params.id);
          }}
        >
          Join this event
        </Button>
      );
    } else {
      return (
        <div className="btnContainer">
          <Modal
            trigger={
              <Button className="cardBtn" id="deleteEventBtn">
                Delete this event
              </Button>
            }
          >
            <h5>Are you sure you want to delete this event?</h5>
            <Link to={"/"}>
              <Button
                className="cardBtn"
                onClick={() => {
                  this.deleteEvent(this.props.match.params.id, user_id);
                }}
              >
                Delete this event
              </Button>
            </Link>
          </Modal>
          <Modal
            trigger={
              <Button className="cardBtn" id="addHostEventBtn">
                Add another host
              </Button>
            }
          >
            <Collection>
              {this.state.allUsers
                .filter(user => {
                  return user.username !== localStorage.getItem("username");
                })
                .map(element => {
                  return this.checkInvited(element.username) ? (
                    <CollectionItem key={element.username}>
                      {element.username}{" "}
                      <Button
                        disabled="true"
                        value={element.username}
                        onClick={() => {
                          this.inviteHost(
                            this.props.match.params.id,
                            element.id
                          );
                        }}
                      >
                        already going
                      </Button>
                    </CollectionItem>
                  ) : (
                    <CollectionItem key={element.username}>
                      {element.username}{" "}
                      <Button
                        value={element.username}
                        className="blue lighten-3"
                        onClick={() => {
                          this.inviteHost(
                            this.props.match.params.id,
                            element.id
                          );
                        }}
                      >
                        add as host
                      </Button>
                    </CollectionItem>
                  );
                })}
            </Collection>
          </Modal>
        </div>
      );
    }
  };

  inviteHost = (EID, userId) => {
    axios.post("/api/addHost/" + EID, { userId: userId }).then(response => {
      let hosts = this.state.hosts;
      hosts.push(response.data.id);
      this.getInfo(EID);
    });
  };

  leaveEvent = (EID, userId) => {
    axios
      .delete("/api/leaveEvent/" + userId, { data: { eventId: EID } })
      .then(response => {
        this.getInfo(EID);
      });
  };

  deleteEvent = (EID, userId) => {
    let isHost = false;
    for (let i = 0; i < this.state.hosts.length; i++) {
      if (this.state.hosts[i].userId === +userId) {
        isHost = true;
      }
    }
    if (isHost) {
      axios.delete("/api/userEvent/" + EID).then(response => {});
    }
  };

  inviteUser = (EID, username) => {
    axios
      .post("/api/invite/", {
        eventId: EID,
        eventName: this.state.currentEvent.name,
        username: username,
        userId: localStorage.getItem("user_id"),
        sender: localStorage.getItem("username")
      })
      .then(response => {});
  };

  checkInvited = current => {
    for (let i = 0; i < this.state.attendees.length; i++) {
      if (this.state.attendees[i].username === current) {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <div>
        <div className="container">
          <Row className="row1">
            <Col s={6}>
              <CardPanel className="eventCard">
                <span id="eventTitle">{this.state.currentEvent.name}</span>
                <br />
                <span id="dateRange">
                  <Icon>date_range</Icon>
                  {this.state.date}
                </span>
                <br />
                <span id="address">
                  <Icon>add_location</Icon>
                  {this.state.currentEvent.address}
                </span>
                <br />
                {this.getHostInfo()}
                <br />
                {this.checkHost()}
                <Modal
                  trigger={
                    <Button id="shareBtn" className="cardBtn">
                      Share with another user!
                    </Button>
                  }
                >
                  <Collection>
                    {this.state.allUsers
                      .filter(user => {
                        return (
                          user.username !== localStorage.getItem("username")
                        );
                      })
                      .map(element => {
                        return this.checkInvited(element.username) ? (
                          <CollectionItem key={element.username}>
                            {element.username}{" "}
                            <Button
                              className="cardBtn"
                              disabled="true"
                              id={element.username}
                              onClick={() => {
                                this.inviteUser(
                                  this.props.match.params.id,
                                  element.username
                                );
                              }}
                            >
                              User is already going
                            </Button>
                          </CollectionItem>
                        ) : (
                          <CollectionItem key={element.username}>
                            {element.username}{" "}
                            <Button
                              className="blue lighten-2"
                              id={element.username}
                              onClick={() => {
                                this.inviteUser(
                                  this.props.match.params.id,
                                  element.username
                                );
                              }}
                            >
                              Invite this user
                            </Button>
                          </CollectionItem>
                        );
                      })}
                  </Collection>
                </Modal>
              </CardPanel>
            </Col>
            <Col s={6} className="mapContainer">
              <MapContainer
                className="map"
                isEvent={true}
                events={this.state.currentEvent}
                lat={window.location.pathname.split("/")[3]}
                lng={window.location.pathname.split("/")[4]}
              />
            </Col>
          </Row>
          <Row className="row2">
            <Col s={6}>
              <CardPanel className="eventCard">
                <span className="colTitle">About this event</span>
                <p>{this.state.currentEvent.description}</p>
              </CardPanel>
            </Col>
            <Col s={6}>
              <CardPanel className="eventCard">
                <span className="colTitle">Attendees</span>
                <br />
                {this.filterHost()}
              </CardPanel>
            </Col>
          </Row>
          <Row>
            <span id="colTitle1">Message Board</span>
            <br />
          </Row>
          <Row>
            <Col s={12}>
              <div id="messageBoard">
                <ul>
                  {this.state.messages.map((message, index) => {
                    return (
                      <li key={index}>
                        <div className="messageBody">
                          <img
                            className="messageImg"
                            src={this.state.attendees
                              .filter(item => {
                                return item.username === message.username;
                              })
                              .map(function(element) {
                                return element.image === null
                                  ? "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"
                                  : `data:image/${element.ext};base64,
                          ${element.image}`;
                              })}
                          />{" "}
                          <span className="usernameMessage">
                            {message.username}
                          </span>
                          <br />
                          <span className="message">{message.content}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div id="messageSubmit">
                  <textarea
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    placeholder="send a message"
                  />
                  <button
                    class="submitBtn"
                    onClick={() => {
                      this.handleMessageSubmit(this.props.match.params.id);
                    }}
                  >
                    <i class="material-icons">send</i>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Event;
