import React from "react";
import styled from "styled-components";

interface WrapperProps {
  readonly width?: string;
}
const Wrapper = styled.div<WrapperProps>`
  display: inline-block;
  margin-left: 15px;
  margin-right: 15px;
  color: red;
  height: 50px;
  width: ${props => props.width ? props.width : "50px"};
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface TableDataProps {
  readonly width?: string;
}

export default class TableData extends React.Component<TableDataProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}
