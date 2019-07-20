import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-area: app;
  height: 100vh;
  overflow: hidden;
`;

export interface LayoutAppProps {
}

export default class LayoutApp extends React.Component<LayoutAppProps> {
  render() {
    return (
      <Wrapper>{this.props.children}</Wrapper>
    );
  }
}