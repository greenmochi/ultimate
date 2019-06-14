import React from "react";
import { 
  connect, 
} from "react-redux";
import { 
  bindActionCreators, 
  Dispatch, 
  AnyAction 
} from "redux";
import { 
  StoreState,
} from "../../store";
import { 
  loadResults, 
} from "../../store/nyaa/action";
import { 
  NyaaResult,
} from "../../store/nyaa/type";
import PostQueryData from "../../api/nyaa/query";
import { 
  SNyaaContainer, 
  SForm, 
  SInput, 
  SSubmitButton, 
  STable, 
  STableRow, 
  STableHeader, 
  STableData,
} from "./style";
import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

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
    this.props.loadResults(postQueryData);
  }

  private renderTable = () => {
    const { nyaa } = this.props;
    return (
      <>
        {nyaa.results.map((result: NyaaResult, index) => (
          <STableRow key={index}>
            <STableData>{result.category}</STableData>
            <STableData left>{result.name}</STableData>
            <STableData>
              <a href={result.link}>magnet</a>
            </STableData>
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
    const { nyaa } = this.props;
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
            defaultValue={nyaa.searchTerm}
          />
          <SSubmitButton
            type="submit"
          >
            <FontAwesomeIcon 
              icon="search"
              size="xs"
              color="white"
            />
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
            {this.renderTable()}
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