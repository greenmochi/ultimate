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

const Container = styled.div`
  background-color: #282C3C;
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
  border: none;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
  &:active {
    background-color: darkgrey;
  }
`;

const TableWrapper = styled.div`
  width: 90%;
  height: 90%;
  // overflow: scroll;
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
  headerWidth: string;
};

class Nyaa extends React.Component<NyaaProps, State> {
  state = {
    headerWidth: "150px",
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
    return (
      <>
        {nyaa.results.map((result: NyaaResult, index) => (
          <TableRow 
            key={index}
            borderBottomColor="#F600FC"
          >
            <TableData>{result.category}</TableData>
            <TableData width={this.state.headerWidth}>{result.name}</TableData>
            <TableData>
              <a href={result.link}>
                <FontAwesomeIcon icon="magnet" color="#F64C72" />
              </a>
            </TableData>
            <TableData>{result.size}</TableData>
            <TableData>{result.date}</TableData>
            <TableData>{result.seeders}</TableData>
            <TableData>{result.leechers}</TableData>
            <TableData>{result.downloads}</TableData>
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
              color="white"
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
            <TableHeader>Category</TableHeader>
            <TableHeader width={this.state.headerWidth}>Name</TableHeader>
            <TableHeader>Link</TableHeader>
            <TableHeader>Size</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader><FontAwesomeIcon icon="arrow-up" /></TableHeader>
            <TableHeader><FontAwesomeIcon icon="arrow-down" /></TableHeader>
            <TableHeader><FontAwesomeIcon icon="check" /></TableHeader>
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