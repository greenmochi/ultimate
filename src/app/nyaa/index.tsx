import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { NyaaState } from "../../store/nyaa/type";
import { setSearchTerm } from "../../store/nyaa/action";

interface NyaaProps {
  nyaa: NyaaState;
  setSearchTerm: typeof setSearchTerm;
}

class Nyaa extends React.Component<NyaaProps> {

  setSearchTerm = (searchTerm: string) => {
    this.props.setSearchTerm(searchTerm);
  }

  render() {
    return (
      <div>
        Nyaa here
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  nyaa: state.nyaa,
});

export default connect(
  mapStateToProps, {
    setSearchTerm,
  },
)(Nyaa);