import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow-y: scroll;
`;

export interface TableBodyProps {
}

export default class TableBody extends React.Component<TableBodyProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}
