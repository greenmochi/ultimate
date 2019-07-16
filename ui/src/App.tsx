import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./component/common/Layout";
import LayoutNavigation from "./component/common/Layout/LayoutNavigation";
import LayoutApp from "./component/common/Layout/LayoutApp";

import Navigation from "./component/common/Navigation";
import NavigationButton from "./component/common/Navigation/NavigationButton";

import Torrent from "./component/torrent";
import YoutubeDL from "./component/youtube-dl";
import Nyaa from "./component/nyaa";
import MyAnimeList from "./component/myanimelist";
import Calculator from "./component/calculator";
import Anime from "./component/anime";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <LayoutNavigation>
          <Navigation>
            <NavigationButton to="/torrent" text="torrent" />
            <NavigationButton to="/youtubedl" text="youtube-dl" />
            <NavigationButton to="/nyaa" text="nyaa" />
            <NavigationButton to="/myanimelist" text="mal" />
            <NavigationButton to="/anime" text="anime" />
            <NavigationButton to="/music" text="music" />
            <NavigationButton to="/calculator" text="calculator" />
          </Navigation>
        </LayoutNavigation>
        <LayoutApp>
          <Switch>
            <Route path="/torrent" component={Torrent} />
            <Route path="/youtubedl" component={YoutubeDL} />
            <Route path="/nyaa" component={Nyaa} />
            <Route path="/myanimelist" component={MyAnimeList} />
            <Route path="/anime" component={Anime} />
            <Route path="/calculator" component={Calculator} />
          </Switch>
        </LayoutApp>
      </Layout>
    </BrowserRouter>
  );
}

export default App;