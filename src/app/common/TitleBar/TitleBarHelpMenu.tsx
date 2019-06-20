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
  help: () => void;
}

export default class TitleBarHelpMenu extends React.Component<TitleBarHelpMenuProps> {
  state = {
    isVisible: false,
  }

  private fileMenuRef = React.createRef<HTMLDivElement>();

  private hide = () => {
    this.setState({ isVisible: !this.state.isVisible }) 
    window.removeEventListener("click", this.handleWindowClick);
  }

  handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({ isVisible: !this.state.isVisible }) 
    window.addEventListener("click", this.handleWindowClick);
  }

  handleWindowClick = (e: MouseEvent) => {
    let fileMenuNode = this.fileMenuRef.current;
    let target = e.target as Node;
    if (fileMenuNode && fileMenuNode !== target) {
      if (!fileMenuNode.contains(target)) {
        this.hide();
      }
    }
  }

  handleHelp = () => {
    this.hide();
    this.props.help();
  }

  private renderMenu = () => {
    if (!this.state.isVisible) {
      return null;
    }
    return (
      <TitleBarMenu>
        <TitleBarMenuItem name="help" onClick={this.handleHelp} />
      </TitleBarMenu>
    )
  }

  render() {
    return (
      <STitleBarHelpMenu
        ref={this.fileMenuRef}
        onClick={this.handleOnClick}
      >
        Help
        {this.renderMenu()}
      </STitleBarHelpMenu>
    );
  }
}