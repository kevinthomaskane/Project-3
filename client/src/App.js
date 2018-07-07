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
import ProfilePage from "./components/ProfilePage";
import NoMatch from "./components/NoMatch";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={mainpage} />
            <Route exact path="/create" component={createEvent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/event/:id/:lat/:lng" component={Even} />
            <Route exact path="/map" component={MapContainer} />
            <Route exact path="/viewpage/:id" component={ViewProfile} />
            <Route exact path="/profilepage" component={ProfilePage} />
            <Route exact path="/search" component={LocationSearchInput} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
