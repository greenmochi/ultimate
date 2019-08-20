import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { StoreState } from "store";
import { setSearchTerm } from "store/music/action";

import Music from "./Music";

const mapStateToProps = (state: StoreState) => ({
  api: state.api, 
  music: state.music,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setSearchTerm,
  }, dispatch)
);

export type MusicProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {}; 

export default connect(mapStateToProps, mapDispatchToProps)(Music);