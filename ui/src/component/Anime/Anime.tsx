import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Container,
  AnimeNavigation,
  AnimeView,
} from "style/component/Anime";
import { AnimeProps } from "component/Anime";

import MyAnimeList from "component/MyAnimeList";

export default class Anime extends React.Component<AnimeProps> {
  render() {
    return (
      <Container>
        <AnimeNavigation>
          <button><Link to={`${this.props.match.url}/mal`}>mal</Link></button>
          <button><Link to={`${this.props.match.url}/nyaa`}>nyaa</Link></button>
          <button><Link to={`${this.props.match.url}/torrent`}>torrent</Link></button>
        </AnimeNavigation>
        <AnimeView>
          <Switch>
            <Route
              path={`${this.props.match.url}/mal`}
              component={MyAnimeList}
            />
            <Route
              path={`${this.props.match.url}/nyaa`}
            />
            <Route
              path={`${this.props.match.url}/torrent`}
            />
          </Switch>
        </AnimeView>
      </Container>
    );
  }
}