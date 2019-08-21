import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { StoreState } from "store";
import { setSearchTerm } from "store/anime/action";

import Anime from "./Anime";

const mapStateToProps = (state: StoreState) => ({
  anime: state.anime,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setSearchTerm,
  }, dispatch)
);

export type AnimeProps = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {};

export default connect(mapStateToProps, mapDispatchToProps)(Anime);