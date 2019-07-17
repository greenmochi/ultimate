import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./component/common/Layout";
import LayoutNavigation from "./component/common/Layout/LayoutNavigation";
import LayoutApp from "./component/common/Layout/LayoutApp";

import Navigation from "./component/common/Navigation";
import NavigationButton from "./component/common/Navigation/NavigationButton";

import Torrent from "./component/Torrent";
import YoutubeDL from "./component/YoutubeDL";
import Nyaa from "./component/Nyaa";
import MyAnimeList from "./component/MyAnimeList";
import Calculator from "./component/Calculator";
import Anime from "./component/Anime";
import Music from "./component/Music";

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
            <Route path="/music" component={Music} />
            <Route path="/calculator" component={Calculator} />
          </Switch>
        </LayoutApp>
      </Layout>
    </BrowserRouter>
  );
}

export default App;