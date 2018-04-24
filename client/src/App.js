import React, { Component } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Even from "./components/Event";
import mainpage from "./components/mainpage";
import Header from "./components/Header";
import MapContainer from "./components/MapContainer"


class App extends Component {
  render() {
    return (
      <Router>
    <div>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={mainpage} />
        {/* <Route exact path="/profile/:id" component={Profile} /> */}
        <Route exact path="/event/:id" component={Even} />
        <Route exact path="/map" component={MapContainer} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
    );
  }
}

export default App;
