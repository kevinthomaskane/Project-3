import React from "react";
import axios from "axios";


class Invitation extends React.Component {

  state = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zip: "",

  };

  componentDidMount = () =>{
    this.getInvites();
  }
  
  getInvites = () => {
    axios.get("/api/invite/" + localStorage.getItem("username")).then((response) => {
      console.log("response from getInvites route", response)
    });
  };

  render() {
    return (
      hello
    )

  };
};

export default SignUp;