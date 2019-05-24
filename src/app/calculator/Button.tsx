import React from "react";
import styled from "styled-components";

const SButton = styled.button`
  background-color: green;
`;

export interface ButtonProps {
  value: string;
  updateCalculator: (value: number) => void;
}

export class Button extends React.Component<ButtonProps, {}> {
  constructor(props: any) {
    super(props);
  }

  handleOnClick = () => {
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