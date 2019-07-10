import React from "react";
import styled from "styled-components";

const SLayoutStatus = styled.div`
  grid-area: status;
  background-color: black;
  color: white;
`;

export interface LayoutStatusProps {
}

export default class LayoutStatus extends React.Component<LayoutStatusProps> {
  render() {
    return (
      <SLayoutStatus>{this.props.children}</SLayoutStatus>
    );
  }
}