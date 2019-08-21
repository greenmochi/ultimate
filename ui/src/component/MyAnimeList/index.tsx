import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { StoreState } from "store";
import { setUsername, loadUserAnimeList, loadAnimeSearchResults } from "store/myanimelist/action";

import MyAnimeList from "./MyAnimeList";

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

export type MyAnimeListProps = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {};

export default connect(mapStateToProps, mapDispatchToProps)(MyAnimeList);