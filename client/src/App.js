import React, { Component } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Even from "./components/Event";
import mainpage from "./components/Mainpage";
import Header from "./components/Header/Header";
import MapContainer from "./components/MapContainer";
import createEvent from "./components/CreateEvent";
import LocationSearchInput from "./components/LocationSearchInput";
import ViewProfile from "./components/ViewProfile/ViewProfile";


class App extends Component {
  render() {
    return (
      <Router>
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={mainpage} />
        <Route exact path="/create" component={createEvent} />
        <Route exact path="/login" component={Login}/>
        {/* <Route exact path="/profile/:id" component={Profile} /> */}
        <Route exact path="/event/:id" component={Even} />
        <Route exact path="/map" component={MapContainer} />
        <Route exact path="/viewpage" component={ViewProfile}/>
        {/* <Route component={NoMatch} /> */}
        <Route exact path="/search" component={LocationSearchInput} />

      </Switch>
    </div>
  </Router>
    );
  }
}

export default App;
