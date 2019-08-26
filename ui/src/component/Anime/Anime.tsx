import React from "react";
import { Switch, Route, Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { StoreState } from "store";
import { setSearchTerm } from "store/anime/action";

import MyAnimeList from "component/MyAnimeList";

import {
  Container,
  AnimeNavigation,
  AnimeView,
} from "./Anime.style";

const mapStateToProps = (state: StoreState) => ({
  anime: state.anime,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setSearchTerm,
  }, dispatch)
);

type AnimeProps = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class Anime extends React.Component<AnimeProps> {
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

export default connect(mapStateToProps, mapDispatchToProps)(Anime);