import React from "react";
import { connect } from "react-redux";
import {
  bindActionCreators,
  Dispatch,
  AnyAction
} from "redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { StoreState } from "../../store";
import { NyaaResult } from "../../store/nyaa/type";
import { loadResults } from "../../store/nyaa/action";
import PostQueryData from "../../api/nyaa/query";

import Table from "./Table";
import TableHeader from "./Table/TableHeader";
import TableRow from "./Table/TableRow";
import TableBody from "./Table/TableBody";
import TableData from "./Table/TableData";

import List from "../common/List";
import Loading from "./Loading";

const Container = styled.div`
  background-color: #1D1D1D;
  text-align: center;
  overflow: hidden;
`;

const Form = styled.form`
  margin: 10px;
`;

const Input = styled.input`
  font-size: 1.3em;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: none;
  color: #CBCBCB;
  background-color: transparent;
  outline: none;
`;

const SearchButton = styled.button`
  font-size: 1.3em;
  margin-left: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  &:hover {
    color: #CBCBCB;
  }
`;

const TableWrapper = styled.div`
  width: 90%;
  height: 90%;
  margin: auto;
  margin-bottom: 150px;
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

interface State {
  categoryWidth: string;
  nameWidth: string;
  linkWidth: string;
  sizeWidth: string;
  dateWidth: string;
  seedersWidth: string;
  leechersWidth: string;
  downloadWidth: string;
};

class Nyaa extends React.Component<NyaaProps, State> {
  state = {
    categoryWidth: "100px",
    nameWidth: "500px",
    linkWidth: "25px",
    sizeWidth: "100px",
    dateWidth: "150px",
    seedersWidth: "30px",
    leechersWidth: "30px",
    downloadWidth: "30px",
  }

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

    if (nyaa.fetchingResults) {
      return (
        <Loading />
      )
    }

    return (
      <>
        {nyaa.results.map((result: NyaaResult, index) => (
          <TableRow 
            key={index}
            borderBottomColor="#666565"
          >
            <TableData 
              width={this.state.categoryWidth}
              color="#CFA719"
            >
              {result.category}
            </TableData>
            <TableData 
              width={this.state.nameWidth}
              color="#CBCBCB"
              textAlign="left"
            >
              {result.name}
            </TableData>
            <TableData width={this.state.linkWidth}>
              <a href={result.link}>
                <FontAwesomeIcon icon="magnet" color="#F64C72" />
              </a>
            </TableData>
            <TableData 
              width={this.state.sizeWidth}
              color="#CBCBCB"
            >
              {result.size}
            </TableData>
            <TableData 
              width={this.state.dateWidth}
              color="#CBCBCB"
            >
              {result.date}
            </TableData>
            <TableData 
              width={this.state.seedersWidth}
              color="#00FF00"
            >
              {result.seeders}
            </TableData>
            <TableData 
              width={this.state.leechersWidth}
              color="red"
            >
              {result.leechers}
            </TableData>
            <TableData 
              width={this.state.downloadWidth}
              color="#CBCBCB"
            >{result.downloads}</TableData>
          </TableRow>
        ))}
      </>
    );
  }

  render() {
    const { nyaa } = this.props;
    return (
      <Container>
        <Form
          onSubmit={this.handleOnSubmit}
        >
          <Input
            autoFocus
            id="search"
            name="search"
            type="text"
            placeholder="Boku no hero academia..."
            defaultValue={nyaa.searchTerm}
          />
          <SearchButton
            type="submit"
          >
            <FontAwesomeIcon
              icon="search"
              size="xs"
            />
          </SearchButton>
        </Form>
        <Table>
          <TableRow 
            header
            height="100%"
            borderTopColor="#50E2D7"
            borderBottomColor="#50E2D7"
            borderLeftColor="#50E2D7"
            borderRightColor="#50E2D7"
          >
            <TableHeader width={this.state.categoryWidth}>Category</TableHeader>
            <TableHeader 
              width={this.state.nameWidth}
              textAlign="left"
            >
              Name
            </TableHeader>
            <TableHeader width={this.state.linkWidth}>Link</TableHeader>
            <TableHeader width={this.state.sizeWidth}>Size</TableHeader>
            <TableHeader width={this.state.dateWidth}>Date</TableHeader>
            <TableHeader width={this.state.seedersWidth}><FontAwesomeIcon icon="arrow-up" /></TableHeader>
            <TableHeader width={this.state.leechersWidth}><FontAwesomeIcon icon="arrow-down" /></TableHeader>
            <TableHeader width={this.state.downloadWidth}><FontAwesomeIcon icon="check" /></TableHeader>
          </TableRow>
          <TableBody
            borderBottomColor="#FDFC31"
            borderLeftColor="#FDFC31"
            borderRightColor="#FDFC31"
          >
            {this.renderTable()}
          </TableBody>
        </Table>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nyaa);