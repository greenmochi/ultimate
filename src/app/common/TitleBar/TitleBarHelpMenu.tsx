import React from "react";
import styled from "styled-components";

import TitleBarMenu from "./TitleBarMenu";
import TitleBarMenuItem from "./TitleBarMenuItem";

const STitleBarHelpMenu = styled.div`
  width: 100%;
  justify-self: center;
  text-align: center;
  &:hover {
    background-color: #4b4f59;
  }
`;

export interface TitleBarHelpMenuProps {
}

export default class TitleBarHelpMenu extends React.Component<TitleBarHelpMenuProps> {
  state = {
    isVisible: false,
  }

  private renderMenu = () => {
    if (!this.state.isVisible) {
      return null;
    }
    return (
      <TitleBarMenu>
        <TitleBarMenuItem name="help" onClick={() => console.log("foo")}>
        </TitleBarMenuItem>
      </TitleBarMenu>
    )
  }

  render() {
    return (
      <STitleBarHelpMenu onClick={() => { this.setState({ isVisible: !this.state.isVisible }) }}>
        Help
        {this.renderMenu()}
      </STitleBarHelpMenu>
    );
  }
}