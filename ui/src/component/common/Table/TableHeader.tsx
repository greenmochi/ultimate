import React from "react";
import styled from "styled-components";

interface WrapperProps {
  readonly width?: string;
  readonly minWidth?: string;
}
const Wrapper = styled.th<WrapperProps>`
  color: #03DAC5;
  border: 1px solid grey;
  width: ${props => props.width};
  min-width: ${props => props.minWidth};
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export interface TableHeaderProps {
  readonly width?: string;
  readonly minWidth?: string;
}

export default class TableHeader extends React.Component<TableHeaderProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}