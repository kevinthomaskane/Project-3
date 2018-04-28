import React from "react";
import axios from "axios";


class Invitation extends React.Component {

  state = {
    inviteInfo: [],

  };

  componentDidMount = () =>{
    this.getInvites();
  };

  getInvites = () => {
    let fullInfo = []
    axios.get("/api/invite/" + localStorage.getItem("username")).then((response) => {
      console.log("response from getInvites route", response);
      for (let i = 0; i < response.data.length; i++){
        fullInfo.push({eventName: response.data[i].eventName, sender: response.data[i].sender})
      }; 
    });
    console.log(fullInfo)
    this.setState({inviteInfo: fullInfo})
    
  };

  acceptInvite = () => {
    axios.post("/api/join/" + this.props.match.params.id, {userId: localStorage.getItem("user_id")}).then((response)=>{
      
    })
  }

  render() {
    return (
      <div>
      {this.state.inviteInfo.map((element)=>{
        return (
        <p>{element.sender} invited you to {element.eventName}<button>Accept</button><button>delete</button></p> 
        )
      })}
      </div>
    )

  };
};

export default Invitation;