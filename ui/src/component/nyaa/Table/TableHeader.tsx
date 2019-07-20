import React from "react";
import styled from "styled-components";

interface WrapperProps {
  readonly width?: string;
}
const Wrapper = styled.div<WrapperProps>`
  display: inline-block;
  margin-left: 15px;
  margin-right: 15px;
  width: ${props => props.width ? props.width : "50px"};
  color: white;
  height: 50px;
`;

const Content = styled.span`
`;

export interface TableHeaderProps {
  readonly width?: string;
}

export default class TableHeader extends React.Component<TableHeaderProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        <Content>{this.props.children}</Content>
      </Wrapper>
    );
  }
}
