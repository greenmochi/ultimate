import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  margin: auto;
  width: 95%;
  min-width: 600px;
  height: 90vh;
  grid-row-gap: 0;
  grid-template-rows: 2em auto;
  grid-template-areas:
    "header"
    "body";
`;

export interface TableProps {
}

export default class Table extends React.Component<TableProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}