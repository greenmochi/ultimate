import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import IpcRenderer from "./ipcRenderer";

import Layout from "./app/common/Layout";
import LayoutNavigation from "./app/common/Layout/LayoutNavigation";
import LayoutApp from "./app/common/Layout/LayoutApp";
import LayoutTitleBar from "./app/common/Layout/LayoutTitleBar";

import TitleBar from "./app/common/TitleBar";
import TitleBarTitle from "./app/common/TitleBar/TitleBarTitle";
import TitleBarWindowButtons from "./app/common/TitleBar/TileBarWindowButtons";
import TitleBarMenu from "./app/common/TitleBar/TitleBarMenu";

import Navigation from "./app/common/Navigation";

import Calculator from "./app/calculator";
import Nyaa from "./app/nyaa";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <LayoutTitleBar>
          <TitleBar>
            <TitleBarMenu>menu</TitleBarMenu>
            <TitleBarTitle title="test"></TitleBarTitle>
            <TitleBarWindowButtons 
              minimize={() => IpcRenderer.send("kabedon:windowsMinimizeRequest")} 
              maximize={() => IpcRenderer.send("kabedon:windowsMaximizeRequest")} 
              unmaximize={() => IpcRenderer.send("kabedon:windowsUnmaximizeRequest")} 
              close={() => IpcRenderer.send("kabedon:windowsCloseRequest")} 
            />
          </TitleBar>
        </LayoutTitleBar>
        <LayoutNavigation>
          <Navigation />
        </LayoutNavigation>
        <LayoutApp>
          <Switch>
            <Route path="/calculator" component={Calculator} />
            <Route path="/nyaa" component={Nyaa} />
          </Switch>
        </LayoutApp>
      </Layout>
    </BrowserRouter>
  );
}

export default App;