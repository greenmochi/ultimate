import React from "react";
import styled from "styled-components";

const TableWrapper = styled.table`
  border-spacing: 0;
`;

export interface TableProps {
}

export default class Table extends React.Component<TableProps> {
  render() {
    return (
      <TableWrapper>
        {this.props.children}
      </TableWrapper>
    );
  }
}