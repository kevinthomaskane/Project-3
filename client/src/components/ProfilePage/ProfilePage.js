import React from "react";
import axios from "axios";
import Header from "../Header/Header";
import Invitation from "../Invitation";
import "./ProfilePage.css";
let id = localStorage.getItem("user_id");

class ProfilePage extends React.Component {

  state = {
    name: "",
    username: "",
    password: "",
    file: ""
  };

  componentDidMount() {
    // make get request to get user info and update
    axios.get("/api/userEvents/" + id).then((response) => {
      console.log(response);

      this.setState({name: response.data.name, username: response.data.username, password: response.data.password});
    });
  };

  handleInput = (event) => {
    console.log(event);
    let name = event.target.name;

    this.setState({[name]: event.target.value})
  }

  handleInputSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.file);
    const formData = new FormData();
    if (this.state.file !== "") {
      let file = document.getElementById("test").files[0];
      formData.append('file', file);
    }
    formData.append('name', this.state.name);
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    axios({
      url: "/update/" + id,
      method: "PUT",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      this.setState({file: ""})
    }).catch((error) => {});
  };

  render() {
    return (<div id="SignUpForm" className="row">
      <Invitation/>
      <div id="editProfile">Edit Your Profile</div>
      <form onSubmit={this.handleInputSubmit} id="formContainer" className="col s12">
        <div className="row">
          <div id="input-field" className="input-field col s6">
            <input onChange={this.handleInput} placeholder="Name" name="name" id="name-ProfilePage" value={this.state.name} type="text" className="validate"/>
          </div>
        </div>
        <div className="row">
          <div id="input-field" className="input-field col s12">
            <input onChange={this.handleInput} placeholder="User Name" name="username" id="username-ProfilePage" value={this.state.username} type="text" className="validate"/>
          </div>
        </div>
        <div className="row">
          <div id="input-field" className="input-field col s6">
            <input onChange={this.handleInput} placeholder="Password" name="password" type="text" id="password-ProfilePage" value={this.state.password} className="validate"/>
          </div>
          <div id="input-field" className="input-field col s6"></div>
        </div>
        <p id="UploadText">Upload Your Image</p>
        <input id="test" type="file" name="file" onChange={this.handleInput}/>
        <input id="SubmitBtn-ProfilePage" className="btn btn-success" type="submit" value="Submit!"/>
        <input id="hiddenInput" type="hidden" value="32" name="userId"/>
      </form>
    </div>)
  };
};

export default ProfilePage;
