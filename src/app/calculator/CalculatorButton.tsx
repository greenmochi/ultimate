import React from "react";
import styled from "styled-components";
import { sendKokoroEndpointRequest } from "../../ipc";

const SCalculatorButton = styled.button`
  background-color: green;
`;

export interface CalculatorButtonProps {
  operation: string;
  calcInput: number;
  calcValue: number;
  updateCalculatorDisplay: (value: number) => void;
  updateCalculatorInput: (value: number) => void;
  updateCalculatorValue: (value: number) => void;
}

export class CalculatorButton extends React.Component<CalculatorButtonProps> {

  handleOnClick = () => {
    const {
      operation,
      calcInput,
      calcValue,
      updateCalculatorDisplay,
      updateCalculatorInput,
      updateCalculatorValue,
    } = this.props;
    switch (operation) {
      case "1": {
        let input: number = (calcInput * 10) + 1; 
        updateCalculatorInput(input);
        updateCalculatorDisplay(input);
        break;
      }
      case "+": {
        let value: number = calcInput + calcValue;
        updateCalculatorValue(value);
        updateCalculatorInput(0);
        updateCalculatorDisplay(value);
        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    const {
      operation,
    } = this.props;
    return (
      <SCalculatorButton onClick={this.handleOnClick}>{operation}</SCalculatorButton>
    );
  }
}