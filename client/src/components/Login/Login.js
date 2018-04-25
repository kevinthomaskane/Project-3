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
    event.preventDefault();
    var t = "t"+ Math.random();
    var data = {
      username: this.state.username,
      password: this.state.password,
      token: t
    };
    axios({method: "POST", url: "/api/login", data: data})
    .then((res) => {
      console.log(res);
      localStorage.setItem("user_id", res.data.id);
      localStorage.setItem("username", res.data.username);
      this.setState({
        username: "",
        password: ""
      });
    }).catch((error) => {});
  };

  render() {
    return (
        <div>
        <form id="loginForm"   >
            <div className="row">
                <div className="input-field col s6">
                    <input onChange={this.handleInputUsername} placeholder="User Name"id="username" value={this.state.username} type="text" className="validate"/>
                </div>
                <div className="input-field col s6">
                    <input onChange={this.handleInputPassword} placeholder="Password "id="password" value={this.state.password} type="text" className="validate"/>
                </div>
            </div>
            <form action="#" id="CheckboxInput" className="col s12 m12 l12">
                <p id="CheckboxInput">
                <label>
                    <input type="checkbox" />
                    <span>Remember me</span>
                </label>
                </p>
            <button onClick={this.handleSubmitForm} className="btn btn-success" type="submit" value="login!">Log In</button>
            </form>
            </form>
        </div>
   )
  };

};

export default Login;
