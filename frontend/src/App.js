import React from "react";
import Processor from "./components/parts/Processor";
import GraphicsCards from "./components/parts/GraphicsCards";
import Motherboard from "./components/parts/Motherboard";
import Psu from "./components/parts/Psu";
import Ram from "./components/parts/Ram";
import Cabinet from "./components/parts/Cabinet";
import Storage from "./components/parts/Storage";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Laptop from "./components/Laptop";
import PreBuild from "./components/PreBuild";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/laptop">
          <Laptop />
        </Route>
        <Route exact path="/prebuild">
          <PreBuild />
        </Route>
        <Route exact path="/processor">
          <Processor />
        </Route>
        <Route path="/graphicscard">
          <GraphicsCards />
        </Route>
        <Route path="/motherboard">
          <Motherboard />
        </Route>
        <Route path="/ram">
          <Ram />
        </Route>
        <Route path="/cabinet">
          <Cabinet />
        </Route>
        <Route path="/storage">
          <Storage />
        </Route>
        <Route path="/psu">
          <Psu />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
