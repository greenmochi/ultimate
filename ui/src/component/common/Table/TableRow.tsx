import React from "react";
import styled from "styled-components";

interface TableRowWrapperProps {
  readonly textAlign?: string;
}
const TableRowWrapper = styled.tr<TableRowWrapperProps>`
  text-align: ${props => props.textAlign ? props.textAlign : "left"};
`;

export interface TableRowProps {
}

export default class TableRow extends React.Component<TableRowProps> {
  render() {
    return (
      <TableRowWrapper>
        {this.props.children}
      </TableRowWrapper>
    );
  }
}