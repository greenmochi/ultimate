import React from "react";
import styled from "styled-components";
import { NavigationImageButton } from "./NavigationImageButton";
import { NavigationButton } from "./NavigationButton";
import imageA from "../../../asset/A.png";
import imageB from "../../../asset/B.png";
import imageC from "../../../asset/C.png";

const Container = styled.div`
  background-color: #22252B;
  text-align: center;
`;

export interface NavigationProps {
}

export default class Navigation extends React.Component<NavigationProps> {
  render() {
    return (
      <Container>
        <NavigationButton to="/youtube" text="youtube"/>
        <NavigationButton to="/nyaa" text="nyaa"/>
        <NavigationButton to="/calculator" text="calculator"/>
        {/* <NavigationImageButton
          to="/youtube"
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
        </NavigationImageButton> */}
      </Container>
    );
  }
}