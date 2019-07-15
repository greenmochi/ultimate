import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  grid-area: navigation;
  // position: sticky;
  height: 100vh;
  // top: 0;
  // left: 0;
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