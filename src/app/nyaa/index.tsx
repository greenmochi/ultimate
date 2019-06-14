import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { 
  bindActionCreators, 
  Dispatch, 
  AnyAction 
} from "redux";
import { StoreState } from "../../store";
import { 
  loadResults, 
} from "../../store/nyaa/action";
import { NyaaResult } from "../../store/nyaa/type";
import PostQueryData from "../../api/nyaa/query";

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

interface STableHeaderProps {
  readonly width?: string;
}

const STableHeader = styled.th<STableHeaderProps>`
  color: #03DAC5;
  border: 1px solid grey;
  width: ${props => props.width};
`;

interface STableDataProps {
  readonly left?: boolean;
}

const STableData = styled.td<STableDataProps>`
  color: white;
  border: 1px solid grey;
  padding: 5px;
  text-align: ${props => props.left ? "left" : "center"};
`;

const mapStateToProps = (state: StoreState) => ({
  nyaa: state.nyaa,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
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

    let postQueryData = new PostQueryData();
    postQueryData.query = searchTerm;

    this.props.loadResults(searchTerm, postQueryData);
  }

  _renderTable = () => {
    const { nyaa } = this.props;
    return (
      <>
        {nyaa.results.map((result: NyaaResult, index) => (
          <STableRow key={index}>
            <STableData>{result.category}</STableData>
            <STableData left>{result.name}</STableData>
            <STableData><a href={result.link}>magnet</a></STableData>
            <STableData>{result.size}</STableData>
            <STableData>{result.date}</STableData>
            <STableData>{result.seeders}</STableData>
            <STableData>{result.leechers}</STableData>
            <STableData>{result.downloads}</STableData>
          </STableRow>
        ))}
      </>
    );
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
              <STableHeader width="140px">Date</STableHeader>
              <STableHeader>Seeders</STableHeader>
              <STableHeader>Leechers</STableHeader>
              <STableHeader>Complete Downloads</STableHeader>
            </STableRow>
          </thead>
          <tbody>
            {this._renderTable()}
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