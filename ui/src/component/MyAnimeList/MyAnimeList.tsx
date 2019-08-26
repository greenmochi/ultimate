import React from "react";
import { connect } from "react-redux";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { StoreState } from "store";
import { 
  setUsername, 
  loadUserAnimeList, 
  loadAnimeSearchResults,
} from "store/myanimelist/action";

import Tab from "component/Tab";

import Search from "./Search";

import {
  Container,
  TabMenu,
} from "./MyAnimeList.style";

const mapStateToProps = (state: StoreState) => ({
    myAnimeList: state.myAnimeList,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setUsername,
    loadUserAnimeList,
    loadAnimeSearchResults,
  }, dispatch)
);

type MyAnimeListProps = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class MyAnimeList extends React.Component<MyAnimeListProps> {
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAnimeList);