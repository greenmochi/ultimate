import React from "react";
import styled from "styled-components";

const SGrid = styled.div`
  display: grid;
  grid-template-columns: 70px auto;
  grid-template-rows: 1fr 50px;
  grid-template-areas:
    "navigation   app"
    "navigation   app"
    "status       status";
`;

export interface GridProps {
}

export class Grid extends React.Component<GridProps> {
  render() {
    return (
      <SGrid>{this.props.children}</SGrid>
    );
  }
}