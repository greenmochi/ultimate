import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { StoreState } from "store";

import Search from "./Search";

const mapStateToProps = (state: StoreState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
  }, dispatch)
);

export type SearchProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {};

export default connect(mapStateToProps, mapDispatchToProps)(Search);