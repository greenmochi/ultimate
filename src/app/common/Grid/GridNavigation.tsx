import React from "react";
import styled from "styled-components";

const SGridNavigation = styled.div`
  grid-area: navigation;
`;

export interface GridNavigationProps {
}

export class GridNavigation extends React.Component<GridNavigationProps> {
  render() {
    return (
      <SGridNavigation>{this.props.children}</SGridNavigation>
    );
  }
}