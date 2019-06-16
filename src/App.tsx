import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import IpcRenderer from "./ipcRenderer";

import Layout from "./app/common/Layout";
import LayoutNavigation from "./app/common/Layout/LayoutNavigation";
import LayoutApp from "./app/common/Layout/LayoutApp";
import LayoutTitleBar from "./app/common/Layout/LayoutTitleBar";

import TitleBar from "./app/common/TitleBar";
import TitleBarTitle from "./app/common/TitleBar/TitleBarTitle";
import TitleBarWindowButtonContainer from "./app/common/TitleBar/TitleBarWindowButtonContainer";
import TitleBarMenuTitle from "./app/common/TitleBar/TitleBarMenuTitle";

import Navigation from "./app/common/Navigation";

import Calculator from "./app/calculator";
import Nyaa from "./app/nyaa";
import TitleBarMenuTitleContainer from "./app/common/TitleBar/TitleBarMenuTitleContainer";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <LayoutTitleBar>
          <TitleBar>
            <TitleBarMenuTitleContainer>
              <TitleBarMenuTitle>File</TitleBarMenuTitle>
              <TitleBarMenuTitle>Help</TitleBarMenuTitle>
            </TitleBarMenuTitleContainer>
            <TitleBarTitle title="test"></TitleBarTitle>
            <TitleBarWindowButtonContainer
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