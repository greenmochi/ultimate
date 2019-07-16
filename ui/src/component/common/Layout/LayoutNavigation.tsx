import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  grid-area: navigation;
  height: 100vh;
  cursor: pointer;
`;

export interface LayoutNavigationProps {
}

export default class LayoutNavigation extends React.Component<LayoutNavigationProps> {
  render() {
    return (
      <Grid>{this.props.children}</Grid>
    );
  }
}