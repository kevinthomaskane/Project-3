import React from "react";
import axios from "axios";
import { Row, Col, Collection, CollectionItem } from "react-materialize";
import "./Invitation.css";

class Invitation extends React.Component {
  state = {
    inviteInfo: []
  };

  componentDidMount = () => {
    this.getInvites();
  };

  getInvites = () => {
    let fullInfo = [];
    axios
      .get("/api/invite/" + localStorage.getItem("username"))
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          fullInfo.push({
            eventName: response.data[i].eventName,
            sender: response.data[i].sender,
            eventId: response.data[i].eventId,
            inviteId: response.data[i].id
          });
        }
        this.setState({ inviteInfo: fullInfo });
      });
  };

  acceptInvite = (eventId, inviteId) => {
    axios
      .post("/api/join/" + eventId, { userId: localStorage.getItem("user_id") })
      .then(response => {
        axios.delete("/api/deleteInvite/" + inviteId).then(second => {
          this.getInvites();
        });
      });
  };

  deleteInvite = inviteId => {
    axios.delete("/api/deleteInvite/" + inviteId).then(response => {
      this.getInvites();
    });
  };

  render() {
    var noDisplay;
    this.state.inviteInfo.length > 0
      ? (noDisplay = null)
      : (noDisplay = "noDisplay");
    return (
      <Row className={noDisplay}>
        <Col m={2} />
        <Col m={8}>
          <Collection header="Your Invitations">
            {this.state.inviteInfo.map(element => {
              return (
                <CollectionItem key={element.inviteId}>
                  <span className="collectionText">
                    {element.sender}
                    invited you to {element.eventName}
                  </span>
                  <button
                    className="green lighten-3"
                    onClick={() => {
                      this.acceptInvite(element.eventId, element.inviteId);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    class="red lighten-3"
                    onClick={() => {
                      this.deleteInvite(element.inviteId);
                    }}
                  >
                    Ignore
                  </button>
                </CollectionItem>
              );
            })}
          </Collection>
        </Col>
        <Col m={2} />
      </Row>
    );
  }
}

export default Invitation;
