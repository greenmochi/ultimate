import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  width: 90%;
  height: auto;
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