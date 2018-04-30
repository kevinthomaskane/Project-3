import React from "react";
import { Col, Row, Container } from "react-materialize";

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
  </Container>
);

export default NoMatch;