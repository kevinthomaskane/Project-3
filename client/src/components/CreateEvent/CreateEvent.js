import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const user_id = localStorage.getItem("user_id");


class createEvent extends React.Component {
  state = {
    eventName: "",
    eventDate: "",
    image: "",
    sportType: "",
    address:"",
    city:"",
    state:"",
    zip:"",
    description:""
  };

  handleInput = (event) => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };
  handleSubmitForm = (event) => {
    console.log(this.state);
    let address = `${this.state.address} ${this.state.city} ${this.state.state} ${this.state.zip}`;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}CA&key=AIzaSyDKYcYNqOJapazYjjFKVq3t94ljuBhx67o`
    ).then((response) => {
      console.log(response);
      let eventObj = {
        name: this.state.eventName,
        date: this.state.eventDate,
        image: this.state.image,
        sportType: this.state.sportType,
        description: this.state.description,
        address: address,
        lat: response.data.results[0].geometry.location.lat,
        lng: response.data.results[0].geometry.location.lng
      }
      console.log(eventObj);
      axios.post("/api/createEvent/"+user_id, eventObj)
        .then((response) => {
          console.log(response);
        });
    });
    window.location.reload()
  };

  render() {
    return (
      <div className="row">
        <form id="createForm">
          <div className="col s6">
            <input onChange={this.handleInput} placeholder="Event name" name="eventName" value={this.state.eventName} type="text" className="validate"/>
          </div>
          <div className="col s6">
            <input onChange={this.handleInput} placeholder="Event Date " name="eventDate" value={this.state.eventDate} type="text" className="validate"/>
          </div>
          <div className="col s6">
            <input onChange={this.handleInput} placeholder="Sport " name="sportType" value={this.state.sportType} type="text" className="validate"/>
          </div>
          <div className="col s6">
            <input onChange={this.handleInput} placeholder="Address " name="address" value={this.state.address} type="text" className="validate"/>
          </div>
          <div className="col s6">
            <input onChange={this.handleInput} placeholder="City " name="city" value={this.state.city} type="text" className="validate"/>
          </div>
          <div className="col s6">
            <input onChange={this.handleInput} placeholder="State " name="state" value={this.state.state} type="text" className="validate"/>
          </div>
          <div className="col s6">
            <input onChange={this.handleInput} placeholder="Zipcode " name="zip" value={this.state.zip} type="text" className="validate"/>
          </div>
          <div className="col s12">
            <input onChange={this.handleInput} placeholder="Description " name="description" value={this.state.description} type="text" className="validate"/>
          </div>
          <Link to="/"><button onClick={this.handleSubmitForm} className="btn btn-success" type="submit" value="login!">Create Event</button></Link>
        </form>
      
      </div>
    );
  }
}

export default createEvent;
