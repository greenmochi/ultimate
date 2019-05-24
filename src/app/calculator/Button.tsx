import React from "react";
import styled from "styled-components";

const SButton = styled.button`
  background-color: green;
`;

export interface ButtonProps {
  value: string;
  input: number;
  updateCalculator: (value: number) => void;
}

export class Button extends React.Component<ButtonProps, {}> {
  constructor(props: any) {
    super(props);
  }

  handleOnClick = () => {
    const {
      input,
    } = this.props;
    console.log(input);
  }

  render() {
    const {
      value,
    } = this.props;
    return (
      <SButton onClick={this.handleOnClick}>{value}</SButton>
    );
  }
}