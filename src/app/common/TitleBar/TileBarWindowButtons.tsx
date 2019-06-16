import React from "react";
import styled from "styled-components";

const STitleBarWindowButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  justify-content: end;
  background-color: white;
`;

const STitleBarWindowButton = styled.div`
  cursor: pointer;
  &:hover {
    background-color: darkgrey;
  }
`;

export interface TitleBarWindowButtonsProps {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

export default class TitleBarWindowButtons extends React.Component<TitleBarWindowButtonsProps> {
  render() {
    return (
      <STitleBarWindowButtons>
        <STitleBarWindowButton onClick={this.props.minimize}>-</STitleBarWindowButton>
        <STitleBarWindowButton onClick={this.props.maximize}>☐</STitleBarWindowButton>
        <STitleBarWindowButton onClick={this.props.close}>X</STitleBarWindowButton>
      </STitleBarWindowButtons>
    );
  }
}