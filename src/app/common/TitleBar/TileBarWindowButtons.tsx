import React from "react";
import styled from "styled-components";

const STitleBarWindowButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  justify-content: end;
  background-color: orange;
`;

const STitleBarWindowButton = styled.div`
  justify-self: center;
  user-select: none;
  -webkit-app-region: no-drag;
  &:hover {
    background-color: darkgrey;
  }
`;

export interface TitleBarWindowButtonsProps {
  minimize: () => void;
  maximize: () => void;
  unmaximize: () => void;
  close: () => void;
}

export default class TitleBarWindowButtons extends React.Component<TitleBarWindowButtonsProps> {
  state = {
    isMaximized: false,
  }

  handleToggle = () => {
    if (this.state.isMaximized) {
      this.props.unmaximize();
    } else {
      this.props.maximize();
    }
    this.setState({ isMaximized: !this.state.isMaximized });
  }

  render() {
    return (
      <STitleBarWindowButtons>
        <STitleBarWindowButton onClick={this.props.minimize}>-</STitleBarWindowButton>
        <STitleBarWindowButton onClick={this.handleToggle}>☐</STitleBarWindowButton>
        <STitleBarWindowButton onClick={this.props.close}>X</STitleBarWindowButton>
      </STitleBarWindowButtons>
    );
  }
}