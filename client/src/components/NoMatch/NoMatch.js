import React from "react";
import { Col, Row, Container } from "react-materialize";
import Invitation from "../Invitation";

const styles = {
  style: {
    fontSize: 40,
    color: "white",
    textAlign: "center"
  }
}

const NoMatch = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <h3 style={styles.style}>404: Page Not Found</h3>
      </Col>
    </Row>
    <Invitation />
  </Container>
);

export default NoMatch;