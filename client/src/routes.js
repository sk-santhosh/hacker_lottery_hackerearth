import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Route, Router } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";

const history = createBrowserHistory();

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Route exact to="/" component={Dashboard} />
      </Router>
    );
  }
}
