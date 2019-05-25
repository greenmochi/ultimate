import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SNavigationButton = styled(Link)`
  background-color: red;
`;

export interface NavigationButtonProps {
  to: string;
}

export class NavigationButton extends React.Component<NavigationButtonProps> {
  render() {
    const {
      to,
    } = this.props;
    return (
      <SNavigationButton to={to}>{this.props.children}</SNavigationButton>
    );
  }
}