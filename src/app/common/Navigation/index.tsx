import React from "react";
import styled from "styled-components";
import { NavigationImageButton } from "./NavigationImageButton";
import imageA from "../../../asset/A.png";
import imageB from "../../../asset/B.png";
import imageC from "../../../asset/C.png";

const SNavigation = styled.div`
  background-color: tomato;
  text-align: center;
`;

export interface NavigationProps {
}

export class Navigation extends React.Component<NavigationProps> {
  render() {
    return (
      <SNavigation>
        <NavigationImageButton
          to="/"
          image={imageA}
        >
        </NavigationImageButton>
        <NavigationImageButton
          to="/nyaa"
          image={imageB}
        >
        </NavigationImageButton>
        <NavigationImageButton
          to="/calculator"
          image={imageC}
        >
        </NavigationImageButton>
      </SNavigation>
    );
  }
}