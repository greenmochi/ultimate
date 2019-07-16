import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 120px auto;
  grid-template-areas:
    "navigation   app";
`;

export interface LayoutProps {
}

export default class Layout extends React.Component<LayoutProps> {
  render() {
    return (
      <GridContainer>{this.props.children}</GridContainer>
    );
  }
}