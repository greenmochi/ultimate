import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { NyaaState } from "../../store/nyaa/type";
import { setSearchTerm } from "../../store/nyaa/action";
import styled from "styled-components";

const SNyaaContainer = styled.div`
`;

interface NyaaProps {
  nyaa: NyaaState;
  setSearchTerm: typeof setSearchTerm;
}

class Nyaa extends React.Component<NyaaProps> {

  setSearchTerm = (searchTerm: string) => {
    this.props.setSearchTerm(searchTerm);
  }

  handleOnSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let searchTerm: string = data.get("search") as string;
    this.setSearchTerm(searchTerm);
  }

  render() {
    return (
      <SNyaaContainer>
        <form
          onSubmit={this.handleOnSubmit}
        >
          <input 
            id="search" 
            name="search"
            type="text" 
            placeholder="Boku no hero academia..."
          />
        </form>
      </SNyaaContainer>
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