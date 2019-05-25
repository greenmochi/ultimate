import React from "react";
import styled from "styled-components";

const SGridApp = styled.div`
  grid-area: app;
`;

export interface GridAppProps {
}

export class GridApp extends React.Component<GridAppProps> {
  render() {
    return (
      <SGridApp>{this.props.children}</SGridApp>
    );
  }
}