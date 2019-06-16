import React from "react";
import styled from "styled-components";

const SLayoutApp = styled.div`
  grid-area: app;
  overflow: hidden;
`;

export interface LayoutAppProps {
}

export default class LayoutApp extends React.Component<LayoutAppProps> {
  render() {
    return (
      <SLayoutApp>{this.props.children}</SLayoutApp>
    );
  }
}