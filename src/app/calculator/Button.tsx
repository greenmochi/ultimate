import React from "react";
import styled from "styled-components";

const SButton = styled.button`
  background-color: green;
`;

export interface ButtonProps {
  operation: string;
  calcInput: number;
  calcValue: number;
  updateCalculatorDisplay: (value: number) => void;
  updateCalculatorInput: (value: number) => void;
  updateCalculatorValue: (value: number) => void;
}

export class Button extends React.Component<ButtonProps, {}> {
  constructor(props: any) {
    super(props);
  }

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
      <SButton onClick={this.handleOnClick}>{operation}</SButton>
    );
  }
}