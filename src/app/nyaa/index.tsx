import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { NyaaState } from "../../store/nyaa/type";
import { setSearchTerm } from "../../store/nyaa/action";
import styled from "styled-components";

const SNyaaContainer = styled.div`
  margin: 5px; 
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
          <button
            type="submit"
          >
            search
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Link</th>
              <th>Size</th>
              <th>Date</th>
              <th>Seeders</th>
              <th>Leechers</th>
              <th>Complete Downloads</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>anime sub</td>
              <td>kimetsu no yaiba</td>
              <td>torrent/magnet</td>
              <td>1.1 GiB</td>
              <td>2019</td>
              <td>2234</td>
              <td>288</td>
              <td>13691</td>
            </tr>
          </tbody>
        </table>
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