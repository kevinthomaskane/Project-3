import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Even from "./components/Event"
import mainpage from "./components/mainpage";

class App extends Component {
  render() {
    return (
      <Router>
    <div>
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/" component={mainpage} />
        {/* <Route exact path="/profile/:id" component={Profile} /> */}
        <Route exact path="/event/:id" component={Even} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
    );
  }
}

export default App;
