import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #22252B;
  text-align: center;
  cursor: pointer;
`;

export interface NavigationProps {
}

export default class Navigation extends React.Component<NavigationProps> {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}