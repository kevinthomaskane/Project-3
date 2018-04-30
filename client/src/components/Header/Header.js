import React from "react";
import "../Header/Header.css";
import {Dropdown, Button, NavItem, Modal} from "react-materialize"
import { BrowserRouter as Router, Route, Link,Redirect} from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
var username = localStorage.getItem("username");


class Header extends React.Component {

  state ={
    loggedIn:false,
 
  }

  componentDidMount(){
    if(username !==null){
    this.setState({
      loggedIn:true
    })
  }
  }
 signIn = () =>{
   console.log("CHECK")
 
  this.setState({
    loggedIn:true
  })
 
 }

 signOut = () =>{
  console.log("hellow")
    localStorage.removeItem("username")
    document.cookie = "token=; expires= Thu, 01 Jan 1970 00:00:00 UTC;";
    this.setState({
      loggedIn:false
    })
};

   render(){
  if (this.state.loggedIn) {
    return (
      <div>
          <div className="row header">
              <div className="col m5 s5 l5"></div>
              <div className="col m3 s3 l3">
                  <a id="logo" href="/">Squad-Up</a>
              </div>
              <div className="col m2">
              <Link to="/create"><Button id="createBtn" >Create an Event</Button></Link>
              </div>
                  <div className="col m2 s2 l2">
                  
                 <Dropdown trigger={<a id="imageLink" href=""><img id="profilePic" data-toggle="modal" data-target="#imageModal" src="https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png" /> <p id="userName">{localStorage.getItem("username")}</p>
                  </a>
                  }>
                  <NavItem divider />
                  <Link to="/profilePage"><NavItem>Profile</NavItem></Link> 
                  <NavItem onClick={()=>this.signOut()} >Log Out</NavItem> 
                  </Dropdown>
                  </div>
              
          </div>
      </div>
  )
  } else {
    return (
      <div>
        <div className="row header">
          <div className="col s5 col m5 col l5"></div>
          <div className="col s3 col m3 col l3">
            <a id="logo" href="/">Squad-Up</a>
          </div>
          <div>
            <div className="col s2 col m2 col l2  ">
              <Modal
                trigger={<a onClick={this.signIn}id="login" href="/login">sign-in</a>}>
                <Login signin={this.signIn}/>
              </Modal>
            </div>
            <Modal
              trigger={<a id="signup" href="/signup"> sign-up</a>}>
              <SignUp />
            </Modal>
          </div>
        </div>
      </div>
    )
  };
}
};

export default Header;
