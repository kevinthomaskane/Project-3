import React from "react";
import axios from "axios";
import "./ViewProfile.css";
import Image from "../Image";
import {Modal,Dropdown, NavItem, Collection, CollectionItem, Navbar,
  Icon, Col, Row, CardPanel, Button} from "react-materialize";

class ViewProfile extends React.Component {

  state = {
    id: "",
    name:"",
    username:"",
    address:"",
    events:[],
  }

  componentDidMount() {
    let id = this.props.match.params.id
    axios.get("/api/userEvents/" + id).then((response) => {
      console.log(response);

      this.setState({
        image: response.data.image,
        tag: response.data.tag,
        id: response.data.id,
        name:response.data.name,
        username:response.data.username,
        address:response.data.address,
        events: response.data.Events
      });
    });
    console.log("state",this.state.events)
  };

  render() {
    console.log(this.state);

    var eventNodes = this.state.events.map( event => {
      console.log("event",event)
      return  (


         <div id="eventsContainer">
            <div  class="row" id="rightCol">
                <span  class="col s12 m12 l12" id="eventTitle">
                  Host:{"  "} {event.name}
                </span>
                <span class="col s6 m6 l6" id="address"><Icon>add_location</Icon>
                  {event.address}
                </span>
                <span class="col s6 m6 l6">Created:
                 {" "}  {event.createdAt.split("T")[0]}
               </span>
                <span  class="col s6 m6 l6"
                  id="dateRange"><Icon>date_range</Icon>
                  {event.date.split("T")[0]}
                </span>
                <span class="col s6 m6 l6" id="sportType">Sport:
                  {event.sportType}
                </span>
            </div>
         </div>

      );
    });


    return (
      <div className="col s12 m12 l12" id="container">
      <div className="col s6 m6 l6">
        <div className="col s6 m6 l6" id="leftContainer">
          <div id="imageContainer">
            <img id="usersImage" src={this.state.image === null ? "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png" : `data:image/${this.state.ext};base64,${this.state.image}`}/>
            <div>
              <p>{this.state.name}</p>
              <p>Username:{this.state.username}</p>
              <p>Address:{this.state.address}</p>
            </div>
          </div>
          <div id="userInfo"></div>
        </div>
      </div>
      <div className="col s6 m6 l6" id="rightContainer">


      </div>
      <div id="eventsText">Events</div>
      {eventNodes}

    </div>)
  }

};

export default ViewProfile;
