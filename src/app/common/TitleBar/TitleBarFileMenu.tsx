import React from "react";
import styled from "styled-components";

import TitleBarMenu from "./TitleBarMenu";
import TitleBarMenuItem from "./TitleBarMenuItem";

const STitleBarFileMenu = styled.div`
  width: 100%;
  justify-self: center;
  text-align: center;
  &:hover {
    background-color: #4b4f59;
  }
`;

export interface TitleBarFileMenuProps {
}

export default class TitleBarFileMenu extends React.Component<TitleBarFileMenuProps> {
  state = {
    isVisible: false,
  }

  private renderMenu = () => {
    if (!this.state.isVisible) {
      return null;
    }
    return (
      <TitleBarMenu>
        <TitleBarMenuItem name="exit" onClick={() => console.log("foo")}>
        </TitleBarMenuItem>
      </TitleBarMenu>
    )
  }

  render() {
    return (
      <STitleBarFileMenu onClick={() => { this.setState({ isVisible: !this.state.isVisible }) }}>
        File
        {this.renderMenu()}
      </STitleBarFileMenu>
    );
  }
}