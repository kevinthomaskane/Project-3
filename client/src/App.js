import React, { Component } from "react";
import Mainpage from "./components/mainpage"
class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Mainpage} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/events/:id" component={Events} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
    
    );
  }
}

export default App;
