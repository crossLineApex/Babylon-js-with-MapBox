import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapComponent from "./components/MapComponent";
import SceneWithSpinningBoxes from "./components/RenderComponent";
import TestComponent from "./components/TestComponent";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MapComponent} />
        <Route path="/render" exact component={SceneWithSpinningBoxes} />
        <Route path="/test" exact component={TestComponent} />
      </Switch>
    </Router>
  );
};

export default App;
