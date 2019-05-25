import React from "react";
import styled from "styled-components";
import { NavigationButton } from "./NavigationButton";

const SNavigation = styled.div`
  background-color: green;
`;

export interface NavigationProps {
}

export class Navigation extends React.Component<NavigationProps> {
  render() {
    return (
      <SNavigation>
        <NavigationButton to="/nyaa">nyaa</NavigationButton>
        <br/>
        <NavigationButton to="/calculator">calculator</NavigationButton>
        <br/>
        <NavigationButton to="/">home</NavigationButton>
      </SNavigation>
    );
  }
}