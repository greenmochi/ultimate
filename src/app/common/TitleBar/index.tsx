import React from "react";
import styled from "styled-components";

const STitleBar = styled.div`
  display: grid;
  grid-template-columns: auto 50px auto;
  background-color: green;
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