import React from "react";
import styled from "styled-components";

const STitleBarWindowButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  justify-content: end;
  color: #BBBBBB;
  background-color: #292C34;
`;

const STitleBarWindowButton = styled.div`
  width: 50px:
  justify-self: center;
  text-align: center;
  user-select: none;
  -webkit-app-region: no-drag;
  &:hover {
    background-color: #4b4f59;
  }
`;

export interface TitleBarWindowButtonContainerProps {
  minimize: () => void;
  maximize: () => void;
  unmaximize: () => void;
  close: () => void;
}

export default class TitleBarWindowButtonContainer extends React.Component<TitleBarWindowButtonContainerProps> {
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
      <STitleBarWindowButtonContainer>
        <STitleBarWindowButton onClick={this.props.minimize}>--</STitleBarWindowButton>
        <STitleBarWindowButton onClick={this.handleToggle}>☐</STitleBarWindowButton>
        <STitleBarWindowButton onClick={this.props.close}>X</STitleBarWindowButton>
      </STitleBarWindowButtonContainer>
    );
  }
}