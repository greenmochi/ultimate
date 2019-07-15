import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./component/common/Layout";
import LayoutNavigation from "./component/common/Layout/LayoutNavigation";
import LayoutApp from "./component/common/Layout/LayoutApp";

import Navigation from "./component/common/Navigation";

import Youtube from "./component/youtube";
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
            <Route path="/youtube" component={Youtube} />
            <Route path="/calculator" component={Calculator} />
            <Route path="/nyaa" component={Nyaa} />
          </Switch>
        </LayoutApp>
      </Layout>
    </BrowserRouter>
  );
}

export default App;