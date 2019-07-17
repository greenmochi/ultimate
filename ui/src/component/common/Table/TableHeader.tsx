import React from "react";
import styled from "styled-components";

interface TableHeaderWrapperProps {
  readonly width?: string;
  readonly minWidth?: string;
}
const TableHeaderWrapper = styled.th<TableHeaderWrapperProps>`
  color: #03DAC5;
  border: 1px solid grey;
  width: ${props => props.width};
  min-width: ${props => props.minWidth};
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export interface TableHeaderProps {
}

export default class TableHeader extends React.Component<TableHeaderProps> {
  render() {
    return (
      <TableHeaderWrapper>
        {this.props.children}
      </TableHeaderWrapper>
    );
  }
}