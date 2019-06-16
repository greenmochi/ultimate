import React from "react";
import styled from "styled-components";

const STitleBarMenu = styled.div`
  display: grid;
`;

export interface TitleBarMenuProps {
}

export default class TitleBarMenu extends React.Component<TitleBarMenuProps> {
  render() {
    return (
      <STitleBarMenu>{this.props.children}</STitleBarMenu>
    );
  }
}