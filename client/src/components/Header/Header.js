import React from "react";
import "./Header.css";
import {Dropdown, Button, NavItem,Modal} from "react-materialize"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp"
var username = localStorage.getItem("username");

const Header = () => {

  if (username !== null) {
    return (
      <div>
          <div className="row header">
              <div className="col m5 s5 l5"></div>
              <div className="col m3 s3 l3">
                  <a id="logo" href="/home">Collab</a>
              </div>
              <div id="dropDownMenu">
                  <div className="col m2 s2 l2"></div>
                  <Dropdown trigger={
                  <div class="col m1 xs1 l1"><a id="imageLink" href=""><img id="profilePic" data-toggle="modal" data-target="#imageModal" src="https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png" />
                  </a>     
                  </div>
              }>
              <NavItem>Users: Name</NavItem>
              <NavItem divider />
              <NavItem>Edit profile</NavItem>
              <NavItem>Log Out</NavItem>
              </Dropdown>         
              </div>         
          </div>
       </div>
    )
  } else {
    return(
      <div>
          <div className="row header">
              <div className="col s5 col m5 col l5"></div>
              <div className="col s3 col m3 col l3">
                  <a id="logo" href="/home">Collab</a>
              </div>
              <div>
              <div className="col s2 col m2 col l2  ">
                                     
              <Modal
              trigger={<a id="login" href="/login">sign in</a>}>
                 <Login/>
              </Modal>
              </div>
            
              <Modal
              trigger={<a id="signup" href="/signeup"> sing up</a>}>  
                <SignUp/>
              </Modal>
              </div>
               </div>
        </div>
    )
  };

};

export default Header;
