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
  exit: () => void;
}

export default class TitleBarFileMenu extends React.Component<TitleBarFileMenuProps> {
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
    if (fileMenuNode && fileMenuNode != target) {
      if (!fileMenuNode.contains(target)) {
        console.log('does notcontains')
        this.hide();
      }
    }
  }

  handleExit = () => {
    this.hide();
    this.props.exit();
  }

  private renderMenu = () => {
    if (!this.state.isVisible) {
      return null;
    }
    return (
      <TitleBarMenu>
        <TitleBarMenuItem name="exit" onClick={this.handleExit} />
      </TitleBarMenu>
    )
  }

  render() {
    return (
      <STitleBarFileMenu 
        ref={this.fileMenuRef}
        onClick={this.handleOnClick}
      >
        File
        {this.renderMenu()}
      </STitleBarFileMenu>
    );
  }
}