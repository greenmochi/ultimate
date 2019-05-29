import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Calculator from "./app/calculator";
import Nyaa from "./app/nyaa";
import { Navigation } from "./app/common";
import { Grid } from "./app/common/Grid";
import { GridNavigation } from "./app/common/Grid/GridNavigation";
import { GridApp } from "./app/common/Grid/GridApp";
import { GridStatus } from "./app/common/Grid/GridStatus";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Grid>
        <GridNavigation>
          <Navigation />
        </GridNavigation>
        <GridApp>
          <Switch>
            <Route path="/nyaa" component={Nyaa} />
            <Route path="/calculator" component={Calculator} />
          </Switch>
        </GridApp>
        <GridStatus>status: Do we really want this? There might be a better way to track status for all apps</GridStatus>
      </Grid>
    </BrowserRouter>
  );
}

export default App;