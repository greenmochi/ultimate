import React from "react";
import styled from "styled-components";

const Wrapper = styled.thead`
`;

export interface TableHeadProps {
}

export default class TableHead extends React.Component<TableHeadProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}