import React from "react";
import styled from "styled-components";

const Wrapper = styled.table`
  border-spacing: 0;
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