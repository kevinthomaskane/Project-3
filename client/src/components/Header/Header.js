import React from "react";
import "../Header/Header.css";
import axios from "axios";
import {Dropdown, Button, NavItem, Modal, Col, Row} from "react-materialize"
import { BrowserRouter as Router, Route, Link,Redirect} from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
const id = localStorage.getItem("user_id");
const username = localStorage.getItem("username");

class Header extends React.Component {

  state = {
    loggedIn: false,
    image: "",
    tag: ""

  }

  componentDidMount() {
    if (username !== null) {
      axios.get("/api/user/" + id).then((data) => {
        console.log(data);
        if(document.cookie.split("=")[1] !== data.data.token){
          this.setState({loggedIn:false});
        } else {
          this.setState({loggedIn: true, image: data.data.image,
            tag: data.data.tag});
        }
      });
    }
  }
  signIn = () => {
    console.log("CHECK")

    this.setState({loggedIn: true})

  }

  signOut = () => {
    console.log("hellow")
    localStorage.removeItem("username")
    document.cookie = "token=; expires= Thu, 01 Jan 1970 00:00:00 UTC;";
    this.setState({loggedIn: false})
  };

 

   render(){
  if (this.state.loggedIn) {
    return (
      <div>
          <Row className="header">
              <Col m={3}>
                  <a id="logo" href="/">Squad-Up</a>
              </Col>
              <Col className="rightItems" m={9}>
                  <Link to="/create"><Button id="createBtn" >Create an Event</Button></Link>
                      
                    <Dropdown trigger={<a id="imageLink" href=""><img id="profilePic" data-toggle="modal" data-target="#imageModal" src={this.state.image === null ?
                                    "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png" :
                                    `data:image/${this.state.tag};base64,
                                    ${this.state.image}`} /> <span id="userName">{localStorage.getItem("username")}</span>
                      </a>
                      }>
                      <NavItem divider />
                      <Link to="/profilePage"><NavItem>Profile</NavItem></Link> 
                      <Link to="/"><NavItem onClick={()=>this.signOut()} >Log Out</NavItem></Link>
                      </Dropdown>
              </Col>
          </Row>
          
      </div>
  )
  } else {
    return (
      <div>
        <div className="row header">
          <div className="col m7 logoDiv">
            <a id="logo" href="/">Squad-Up</a>
          </div>
            <div className="col m2 offset-m1">
              <Modal trigger={<a onClick = {
                  this.signIn
                }
                id = "login" href = "/login" > sign - in</a>}>
                <Login signin={this.signIn}/>
              </Modal>
            </div>
            <div className="col m2">
              <Modal trigger={<a id = "signup" href = "/signup" >
              sign - up</a>}>
                <SignUp/>
              </Modal>
            </div>
        </div>
      </div>)
    };
  }
};

export default Header;
