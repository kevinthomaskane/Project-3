import React, { Component } from "react";
import {
  Navbar,
  Icon,
  Col,
  Row,
  NavItem,
  CardPanel,
  Button,
  MediaBox,
  Slider,
  Parallax,
  Slide
} from "react-materialize";
import "./ParallaxSlider.css";

export class ParallaxSlider extends Component {
  render() {
    return (
      <Slider className="Slider">
        <Slide
          src="../../images/basketball-background.jpg"
          title="Squad-Up and play with your friends"
          placement="right"
        />
        <Slide
          src="../../images/flag-football-background.jpg"
          title="Or Find a Game Anywhere Anytime"
          placement="left"
        />
        <Slide
          src="../../images/frisbee-background.jpg"
          title="Squad-Up and play with your friends"
          placement="right"
        />
        <Slide
          src="../../images/soccer-background.jpg"
          title="Or Find a Game Anywhere Anytime"
          placement="right"
        />
      </Slider>
    );
  }
}

export default ParallaxSlider;
