import React from "react";

import axios from "axios";
import "./Login.css";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleInputUsername = (event) => {
    this.setState({username: event.target.value});
  };
  handleInputPassword = (event) => {
    this.setState({password: event.target.value});
  };

  handleSubmitForm = (event) => {
    event.preventDefault()
    var data = {
      username: this.state.username,
      password: this.state.password
    };
    axios({method: "GET", url: "/api/login", data: data}).then((res) => {}).catch((error) => {});
  };

  render() {
    return (<div>
      <form id="loginForm" className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input onChange={this.handleInputUsername} placeholder="User Name" id="last_name" value={this.state.username} type="text" className="validate"/>
          </div>
          <div className="input-field col s6">
            <input onChange={this.handleInputPassword} placeholder="Password " id="last_name" value={this.state.password} type="text" className="validate"/>
          </div>
        </div>
        <button onClick={() => this.handleSubmitForm()} className="btn btn-success" type="submit" value="login!">Log In</button>
      </form>

    </div>)
  };

};

export default Login;
