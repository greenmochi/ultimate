import React from "react";
import styled from "styled-components";

const SLayoutTitleBar = styled.div`
  grid-area: title-bar;
  // position: sticky;
  // top: 0;
  // left: 0;
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