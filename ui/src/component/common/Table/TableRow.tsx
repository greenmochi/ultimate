import React from "react";
import styled from "styled-components";

interface WrapperProps {
  readonly textAlign?: string;
}
const Wrapper = styled.tr<WrapperProps>`
  text-align: ${props => props.textAlign ? props.textAlign : "left"};
`;

export interface TableRowProps {
  readonly textAlign?: string;
}

export default class TableRow extends React.Component<TableRowProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}