import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./component/common/Layout";
import LayoutNavigation from "./component/common/Layout/LayoutNavigation";
import LayoutApp from "./component/common/Layout/LayoutApp";

import Navigation from "./component/common/Navigation";

import YoutubeDL from "./component/youtubedl";
import Calculator from "./component/calculator";
import Nyaa from "./component/nyaa";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <LayoutNavigation>
          <Navigation />
        </LayoutNavigation>
        <LayoutApp>
          <Switch>
            <Route path="/youtubedl" component={YoutubeDL} />
            <Route path="/nyaa" component={Nyaa} />
            <Route path="/calculator" component={Calculator} />
          </Switch>
        </LayoutApp>
      </Layout>
    </BrowserRouter>
  );
}

export default App;