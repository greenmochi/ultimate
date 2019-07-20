import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 50px;
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