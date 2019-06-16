import React from "react";
import styled from "styled-components";

const STitleBarMenuItem = styled.div`
  width: 150px;
  text-align: center;
`;

export interface TitleBarMenuItemProps {
  name: string;
  onClick: () => void;
}

export default class TitleBarMenuItem extends React.Component<TitleBarMenuItemProps> {
  render() {
    return (
      <STitleBarMenuItem
        onClick={this.props.onClick}
      >
        {this.props.name}
      </STitleBarMenuItem>
    );
  }
}