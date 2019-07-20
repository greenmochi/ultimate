import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow-hidden;
  height: 50px;
  white-space: nowrap;
  text-align: left;
  border: 1px solid #F600FC;
`;

export interface TableRowProps {
}

export default class TableRow extends React.Component<TableRowProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}