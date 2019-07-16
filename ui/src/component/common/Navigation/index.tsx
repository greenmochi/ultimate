import React from "react";
import styled from "styled-components";
import NavigationButton from "./NavigationButton";

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
        <NavigationButton to="/torrent" text="torrent"/>
        <NavigationButton to="/youtubedl" text="youtube-dl"/>
        <NavigationButton to="/nyaa" text="nyaa"/>
        <NavigationButton to="/myanimelist" text="mal"/>
        <NavigationButton to="/anime" text="anime"/>
        <NavigationButton to="/music" text="music"/>
        <NavigationButton to="/calculator" text="calculator"/>
      </Container>
    );
  }
}