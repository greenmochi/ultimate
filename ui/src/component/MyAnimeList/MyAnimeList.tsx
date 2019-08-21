import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  Container,
  TabMenu,
} from "style/component/MyAnimeList";

import { MyAnimeListProps } from "component/MyAnimeList";
import Tab from "component/Tab";

import Search from "./Search";

export default class MyAnimeList extends React.Component<MyAnimeListProps> {
  render() {
    return (
      <Container>
        <TabMenu>
          <Tab
            title="Search"
            to={`${this.props.match.url}/search`}
          />
          <Tab
            title="Anime"
            to={`${this.props.match.url}/anime`}
          />
          <Tab
            title="List"
            to={`${this.props.match.url}/list`}
          />
        </TabMenu>
        <Switch>
          <Route
            path={`${this.props.match.url}/search`}
            render={() => (
              <Search />
            )}
          />
          <Route
            path={`${this.props.match.url}/anime`}
            render={() => (
              <div>
                penis 2
              </div>
            )}
          />
          <Route
            path={`${this.props.match.url}/list`}
            render={() => (
              <div>
                penis 3
              </div>
            )}
          />
        </Switch>
      </Container>
    );
  }
}