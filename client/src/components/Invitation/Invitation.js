import React from "react";
import axios from "axios";
import {Row, Col, Collection, CollectionItem} from "react-materialize";
import { setTimeout } from "timers";

class Invitation extends React.Component {

  state = {
    inviteInfo: [],
    delete: false
  };

  componentDidMount = () =>{
    this.getInvites();
  };

  getInvites = () => {
    let fullInfo = []
    axios.get("/api/invite/" + localStorage.getItem("username")).then((response) => {
      console.log(response)
      for (let i = 0; i < response.data.length; i++){
        fullInfo.push({eventName: response.data[i].eventName, sender: response.data[i].sender, eventId: response.data[i].eventId, inviteId: response.data[i].id})
      }; 
      this.setState({inviteInfo: fullInfo})
    });
  };

  acceptInvite = (eventId, inviteId) => {
    axios.post("/api/join/" + eventId, {userId: localStorage.getItem("user_id")}).then((response)=>{
      axios.delete("/api/deleteInvite/" + inviteId).then((second) => {
        this.setState({delete: true})
      })
    });
  };

  printInvites = (array) => {
    return (
    array.map((element)=>{
      return (
        <CollectionItem>{element.sender} invited you to {element.eventName}<button onClick={()=>{
        this.acceptInvite(element.eventId, element.inviteId);
        }}>Accept</button><button>delete</button>
        </CollectionItem> 
        )
      })
    )
  }

  render() {
    return (
        <Row>
        {console.log(this.state.inviteInfo)}
          <Col m={6}>
            <Collection header="Your Invitations">
                {this.state.inviteInfo.map((element)=>{
                  console.log(this.state.inviteInfo)
                  return (
                    <CollectionItem>{element.sender} invited you to {element.eventName}<button onClick={()=>{
                    this.acceptInvite(element.eventId, element.inviteId);
                    }}>Accept</button><button>delete</button>
                    </CollectionItem> 
                  )
                })}
            </Collection>
          </Col>
        </Row>
    )
  };
};

export default Invitation;