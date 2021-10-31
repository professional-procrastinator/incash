import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Landing from "./pages/landing"
import Home from "./pages/home"


function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
              <Landing />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          
        </Switch>
    </Router>
  );
}


export default App;
