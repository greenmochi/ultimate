import React from "react";
import styled from "styled-components";

const STitleBarMenuTitleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  user-select: none;
  -webkit-app-region: no-drag;
  color: #BBBBBB;
`;

export interface TitleBarMenuTitleContainerProps {
}

export default class TitleBarMenuTitleContainer extends React.Component<TitleBarMenuTitleContainerProps> {
  render() {
    return (
      <STitleBarMenuTitleContainer>{this.props.children}</STitleBarMenuTitleContainer>
    );
  }
}