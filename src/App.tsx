import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Calculator from "./app/calculator";
import Nyaa from "./app/nyaa";
import { Navigation } from "./app/common";
import { Grid } from "./app/common/Grid";
import { GridNavigation } from "./app/common/Grid/GridNavigation";
import { GridApp } from "./app/common/Grid/GridApp";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Grid>
        <GridNavigation>
          <Navigation />
        </GridNavigation>
        <GridApp>
          <Switch>
            <Route path="/calculator" component={Calculator} />
            <Route path="/nyaa" component={Nyaa} />
          </Switch>
        </GridApp>
      </Grid>
    </BrowserRouter>
  );
}

export default App;