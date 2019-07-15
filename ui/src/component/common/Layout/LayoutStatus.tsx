import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  grid-area: status;
  background-color: black;
  color: white;
`;

export interface LayoutStatusProps {
}

export default class LayoutStatus extends React.Component<LayoutStatusProps> {
  render() {
    return (
      <Grid>{this.props.children}</Grid>
    );
  }
}