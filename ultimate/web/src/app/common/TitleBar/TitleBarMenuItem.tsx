import React from "react";
import styled from "styled-components";

const STitleBarMenuItem = styled.div`
  width: 150px;
  text-align: center;
  &:hover {
    background-color: orange;
  }
`;

export interface TitleBarMenuItemProps {
  name: string;
  onClick: () => void;
}

export default class TitleBarMenuItem extends React.Component<TitleBarMenuItemProps> {

  handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.props.onClick();
  }

  render() {
    return (
      <STitleBarMenuItem
        onClick={this.handleOnClick}
      >
        {this.props.name}
      </STitleBarMenuItem>
    );
  }
}