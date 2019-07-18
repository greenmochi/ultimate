import React from "react";
import styled from "styled-components";

interface TableDataWrapperProps {
  readonly left?: boolean;
  readonly color?: string;
}
const TableDataWrapper = styled.td<TableDataWrapperProps>`
  color: ${props => props.color ? props.color : "#A1A9B5"};
  border: 1px solid grey;
  padding: 5px;
  text-align: ${props => props.left ? "left" : "center"};
`;

export interface TableDataProps {
  readonly left?: boolean;
  readonly color?: string;
}

export default class TableData extends React.Component<TableDataProps> {
  render() {
    return (
      <TableDataWrapper {...this.props}>
        {this.props.children}
      </TableDataWrapper>
    );
  }
}