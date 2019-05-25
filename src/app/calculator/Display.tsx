import React from "react";
import styled from "styled-components";

const SDisplay = styled.span`
  background-color: yellow;
`

export interface DisplayProps {
}

export class Display extends React.Component<DisplayProps, {}> {
  render() {
    return (
      <SDisplay>{this.props.children}</SDisplay>
    )
  }
}