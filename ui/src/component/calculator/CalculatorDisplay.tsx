import React from "react";
import styled from "styled-components";

const SCalculatorDisplay = styled.span`
  background-color: yellow;
`

export interface CalculatorDisplayProps {
}

export class CalculatorDisplay extends React.Component<CalculatorDisplayProps> {
  render() {
    return (
      <SCalculatorDisplay>{this.props.children}</SCalculatorDisplay>
    )
  }
}