import React from "react";
import styled from "styled-components";

const STitleBarMenu = styled.div`
  position: absolute;
  background-color: purple;
  height: auto;
`;

export interface TitleBarMenuProps {
}

export default class TitleBarMenu extends React.Component<TitleBarMenuProps> {
  render() {
    return (
      <STitleBarMenu>
        {this.props.children}
      </STitleBarMenu>
    );
  }
}