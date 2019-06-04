import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../store";
import { 
  setSearchTerm, 
  loadResults, 
} from "../../store/nyaa/action";
import styled from "styled-components";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

const SNyaaContainer = styled.div`
  background-color: #121212;
  padding: 5px; 
`;

const SForm = styled.form`
  margin: 10px;
`;

const SInput = styled.input`
  font-size: 2em;
`;

const SSubmitButton = styled.button`
  font-size: 2em;
`;

const STable = styled.table`
  margin: 10px;
  border-spacing: 0;
`;

const STableRow = styled.tr`
  text-align: center;
`;

const STableHeader = styled.th`
  color: #03DAC5;
  border: 1px solid grey;
`;

const STableData = styled.td`
  color: white;
  border: 1px solid grey;
  padding: 5px;
`;

const mapStateToProps = (state: StoreState) => ({
  nyaa: state.nyaa,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setSearchTerm: setSearchTerm,
    loadResults: loadResults,
  }, dispatch)
);

type NyaaProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
  };

class Nyaa extends React.Component<NyaaProps> {

  handleOnSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let searchTerm: string = data.get("search") as string;
    this.props.setSearchTerm(searchTerm);

    this.props.loadResults();
  }

  _renderTable = () => {
  }

  render() {
    return (
      <SNyaaContainer>
        <SForm
          onSubmit={this.handleOnSubmit}
        >
          <SInput 
            id="search" 
            name="search"
            type="text" 
            placeholder="Boku no hero academia..."
          />
          <SSubmitButton
            type="submit"
          >
            search
          </SSubmitButton>
        </SForm>
        <STable>
          <thead>
            <STableRow>
              <STableHeader>Category</STableHeader>
              <STableHeader>Name</STableHeader>
              <STableHeader>Link</STableHeader>
              <STableHeader>Size</STableHeader>
              <STableHeader>Date</STableHeader>
              <STableHeader>Seeders</STableHeader>
              <STableHeader>Leechers</STableHeader>
              <STableHeader>Complete Downloads</STableHeader>
            </STableRow>
          </thead>
          <tbody>
            <STableRow>
              <STableData>anime sub</STableData>
              <STableData>kimetsu no yaiba</STableData>
              <STableData>torrent/magnet</STableData>
              <STableData>1.1 GiB</STableData>
              <STableData>2019</STableData>
              <STableData>2234</STableData>
              <STableData>288</STableData>
              <STableData>13691</STableData>
            </STableRow>
          </tbody>
        </STable>
      </SNyaaContainer>
    );
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(Nyaa);