import React from "react";
import styled from "styled-components";

const STitleBarMenuTitle = styled.div`
  display: grid;
  justify-self: center;
  &:hover {
    background-color: darkgrey;
  }
`;

export interface TitleBarMenuTitleProps {
}

export default class TitleBarMenuTitle extends React.Component<TitleBarMenuTitleProps> {
  render() {
    return (
      <STitleBarMenuTitle>{this.props.children}</STitleBarMenuTitle>
    );
  }
}