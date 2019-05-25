import React from "react";
import styled from "styled-components";

const SButton = styled.button`
  background-color: green;
`;

export interface ButtonProps {
  operation: string;
  calcInput: number;
  calcValue: number;
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
      updateCalculatorInput,
      updateCalculatorValue,
    } = this.props;
    switch (operation) {
      case "1": {
        let input: number = (calcInput * 10) + 1; 
        updateCalculatorInput(input);
        break;
      }
      case "+": {
        updateCalculatorValue(calcInput + calcValue);
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