import React from "react";
import {
  connect,
} from "react-redux";
import {
  bindActionCreators,
  Dispatch,
  AnyAction
} from "redux";
import styled from "styled-components";
import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import { StoreState } from "../../store";
import { NyaaResult } from "../../store/nyaa/type";
import { loadResults } from "../../store/nyaa/action";
import PostQueryData from "../../api/nyaa/query";

import Table from "../common/Table";
import TableHeader from "../common/Table/TableHeader";
import TableRow from "../common/Table/TableRow";
import TableData from "../common/Table/TableData";

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
  outline: none;
`;

const SubmitButton = styled.button`
  font-size: 1.3em;
  margin-left: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  background-color: #F7941D;
  border: none;
  outline: none;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  width: 90%;
  height: 90%;
  overflow-y: scroll;
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
          <TableRow textAlign="center" key={index}>
            <TableData>{result.category}</TableData>
            <TableData
              left
              color="#75CFFA"
            >
              {result.name}
            </TableData>
            <TableData>
              <a href={result.link}>
                <FontAwesomeIcon
                  icon="magnet"
                  color="#F64C72"
                />
              </a>
            </TableData>
            <TableData>{result.size}</TableData>
            <TableData>{result.date}</TableData>
            <TableData color="green">{result.seeders}</TableData>
            <TableData color="red">{result.leechers}</TableData>
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
          <SubmitButton
            type="submit"
          >
            <FontAwesomeIcon
              icon="search"
              size="xs"
              color="white"
            />
          </SubmitButton>
        </Form>
        <TableWrapper>
          <Table>
            <thead>
              <TableRow>
                <TableHeader minWidth="100px">Category</TableHeader>
                <TableHeader minWidth="100px">Name</TableHeader>
                <TableHeader>Link</TableHeader>
                <TableHeader minWidth="100px">Size</TableHeader>
                <TableHeader width="140px">Date</TableHeader>
                <TableHeader>
                  <FontAwesomeIcon icon="arrow-up" />
                </TableHeader>
                <TableHeader>
                  <FontAwesomeIcon icon="arrow-down" />
                </TableHeader>
                <TableHeader>
                  <FontAwesomeIcon icon="check" />
                </TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {this.renderTable()}
            </tbody>
          </Table>
        </TableWrapper>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nyaa);