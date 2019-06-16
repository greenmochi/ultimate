import React from "react";
import styled from "styled-components";

const SLayoutTitleBar = styled.div`
  grid-area: title-bar;
`;

export interface LayoutTitleBarProps {
}

export default class LayoutTitleBar extends React.Component<LayoutTitleBarProps> {
  render() {
    return (
      <SLayoutTitleBar>{this.props.children}</SLayoutTitleBar>
    );
  }
}