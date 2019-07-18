import React from "react";
import styled from "styled-components";

const TableHeadWrapper = styled.thead`
`;

export interface TableHeadProps {
}

export default class TableHead extends React.Component<TableHeadProps> {
  render() {
    return (
      <TableHeadWrapper {...this.props}>
        {this.props.children}
      </TableHeadWrapper>
    );
  }
}