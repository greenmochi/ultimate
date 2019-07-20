import React from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
`;

export interface ListProps {
}

export default class List extends React.Component<ListProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}