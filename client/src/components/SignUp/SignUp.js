import React from "react";
import axios from "axios";
import "./SignUp.css";
class SignUp extends React.Component {

  state = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zip: ""

  };

  handleInput = (event) => {
    let name = event.target.name;
    this.setState({[name]: event.target.value})
  }

  handleInputSubmit = (event) => {
    event.preventDefault();
    let lat;
    let lng;
    let address = `${this.state.address} ${this.state.city} ${this.state.state} ${this.state.zip}`;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}CA&key=AIzaSyDKYcYNqOJapazYjjFKVq3t94ljuBhx67o`).then((response) => {
      if (response.data.results.length > 0) {
        lat = response.data.results[0].geometry.location.lat;
        lng = response.data.results[0].geometry.location.lng;
      } else {
        lat = 0;
        lng = 0;
      }
      var data = {
        name: `${this.state.first_name} ${this.state.last_name}`,
        username: this.state.username,
        password: this.state.password,
        address: address,
        lat: lat,
        lon: lng
      };
      axios({method: "POST", url: "/api/newUser", data: data}).then((res) => {
        localStorage.setItem("user_id", res.data.id);
        localStorage.setItem("username", res.data.username);
        this.setState({
          first_name: "",
          last_name: "",
          username: "",
          password: "",
          address: "",
          city: "",
          state: "",
          zip: ""
        });
      }).catch((error) => {});
    });
  };

  render() {
    return (<div id="SignUpForm" class="row">
      <form className="col s12">

        <div className="row">
          <div className="input-field col s6">
            <input type="text" onChange={this.handleInput} placeholder="First Name" name="first_name" value={this.state.first_name} className="validate"/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input type="text" onChange={this.handleInput} placeholder="Last Name" name="last_name" value={this.state.last_name} className="validate"/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input onChange={this.handleInput} placeholder="Username" name="username" value={this.state.username} type="text" className="validate"/>
          </div>
          <div className="input-field col s6">
            <input onChange={this.handleInput} placeholder="Password" name="password" value={this.state.password} type="password" className="validate"/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input type="text" onChange={this.handleInput} placeholder="Address" name="address" value={this.state.address} className="validate"/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input type="text" onChange={this.handleInput} placeholder="City" name="city" value={this.state.city} className="validate"/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input type="text" onChange={this.handleInput} placeholder="State" name="state" value={this.state.state} className="validate"/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input type="text" onChange={this.handleInput} placeholder="Zipcode" name="zip" value={this.state.zip} className="validate"/>
          </div>
        </div>
        <form id="uploadImg" method="post" enctype="multipart/form-data">
          <p id="UploadText">Upload Your Image</p>
          <input type="file" name="uploadFile"/>
          <input id="hiddenInput" type="hidden" value="32" name="userId"/>
        </form>
        <button onClick={this.handleInputSubmit} className="btn btn-success" type="submit" value="Submit!"></button>
      </form>
    </div>)

  };
};

export default SignUp;
