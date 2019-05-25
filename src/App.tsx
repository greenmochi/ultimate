import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Calculator from "./app/calculator";
import Nyaa from "./app/nyaa";
import { Navigation } from "./app/common";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/nyaa" component={Nyaa} />
          <Route path="/calculator" component={Calculator} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;