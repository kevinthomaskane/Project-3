import React from "react";
import axios from "axios";
import "./ViewProfile.css";
import Image from "../Image";

import {Dropdown, Button, NavItem, Modal} from "react-materialize";
class ViewProfile extends React.Component {

  state = {
    id: "",
    name:"",
    events:[],
  }

  componentDidMount() {
    let id = localStorage.getItem("user_id");
    //      let id = this.props.match.params.id
    axios.get("/api/userEvents/" + id).then((response) => {
      console.log(response);
    
      this.setState({
        id: response.data.id,
        name:response.data.name,
        events: response.data.Events
      });
    });
    console.log(this.state.name)
  };

  render() {
    console.log(this.state);

    var eventNodes = this.state.events.map( event => {
      return  (
          <div id="eventsContainer">
          <div>Events</div>
          <div>Name:{event.name}</div>
          <div>Address:{event.address}</div>
          <div>Created At:{event.date.slice("T")[0]}</div>
        </div>
      );
    });


    return (
      <div className="col s12 m12 l12" id="container">
      <div className="col s6 m6 l6">
        <div className="col s6 m6 l6" id="leftContainer">
          <div id="imageContainer">
            <img id="usersImage" src="https://s3.amazonaws.com/pickfu-media/options/6649/8a87b229e35a719a635c94910f4e2373b4dab86c.png?1374528750"/>
            <div>
              <p>{this.state.name}</p>
              <p id="ratingStars">☆☆☆☆☆☆☆</p>
            </div>
          </div>
          <div id="userInfo"></div>
        </div>
      </div>
      <div className="col s6 m6 l6" id="rightContainer">
    
        <Modal trigger={<a id = "signup" href = "/image" > Upload - Image</a>}>
          <Image id={this.state.id}/>
        </Modal>
      </div>
      {eventNodes}
      
    </div>)
  }

};

export default ViewProfile;
