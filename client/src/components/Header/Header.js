import React from "react";
import "./Header.css";
import {Dropdown, Button, NavItem} from "react-materialize"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

var username = localStorage.getItem("username");

const Header = () => {

  if (username !== null) {
    return (<div>
      <div class="row header">
        <div class="col m6"></div>
        <div class="col m3">
          <a id="logo" href="/home">SQUAD UP</a>
        </div>
        <div id="dropDownMenu">
          <div class="col m2"></div>
          <Dropdown trigger={<div class = "col s1" > <a id="imageLink" href=""><img id="profilePic" data-toggle="modal" data-target="#imageModal" src="https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"/>
            </a>

          </div>}>
            <NavItem>Edit profile</NavItem>
            <NavItem>Log Out</NavItem>
            <NavItem divider="divider"/>
            <NavItem>Info</NavItem>
          </Dropdown>

        </div>

      </div>

    </div>)
  } else {
    return (<div>
      <div class="row header">
        <div class="col m5"></div>
        <div class="col m2">
          <a id="logo" href="/home">Collab</a>
        </div>
        <div>
          <div class="col m2"></div>
          <Link to="/login" id="logout">log in /
          </Link>
          <a id="logout" href="/signup">
            sign up</a>
        </div>
        <div class="col m2"></div>
      </div>

    </div>)
  };

};

export default Header;
