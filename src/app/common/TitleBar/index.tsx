import React from "react";
import styled from "styled-components";

const STitleBar = styled.div`
  display: grid;
  grid-template-columns: 100px auto 150px;
  background-color: #292C34;
  -webkit-app-region: drag;
`;

export interface TitleBarProps {
}

export default class TitleBar extends React.Component<TitleBarProps> {
  render() {
    return (
      <STitleBar>{this.props.children}</STitleBar>
    );
  }
}