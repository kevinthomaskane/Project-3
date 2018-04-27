import React, { Component } from 'react';
import { Navbar, Icon, Col, Row, NavItem, CardPanel, Button, MediaBox, Slider, Parallax, Slide } from "react-materialize";
import "./ParallaxSlider.css";



export class ParallaxSlider extends Component {

    // componentDidMount() {
    //     Axios.get("../../public/images/basketball-background.jpg")
    //         .then(res =>
    //             console.log(res)
    //         )
    // }

    render() {
        return (
            <Slider className="Slider">
                <Slide
                    src="../../images/basketball-background.jpg"
                    title="Squad-Up and play with your friends"
                    placement="right">
                </Slide>
                <Slide
                    src="../../images/flag-football-background.jpg"
                    title="Squad-Up and play with your friends"
                    placement="left">
                </Slide>
                <Slide
                    src="../../images/frisbee-background.jpg"
                    title="Squad-Up and play with your friends"
                    placement="right">
                </Slide>
                <Slide
                    src="../../images/soccer-background.jpg"
                    title="Squad-Up and play with your friends"
                    placement="right">
                </Slide>
            </Slider>
        );
    }


}

export default ParallaxSlider;


