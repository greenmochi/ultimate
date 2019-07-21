import React from "react";
import styled from "styled-components";

interface WrapperProps {
  width?: string;
  textAlign?: string;
  color?: string;
}

const Wrapper = styled.div<WrapperProps>`
  display: inline-block;
  width: ${props => props.width ? props.width : "50px"};
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;
  overflow: hidden;
  padding: 1px;
  color: ${props => props.color ? props.color : "red"};
  text-overflow: ellipsis;
  text-align: ${props => props.textAlign ? props.textAlign : "center"};
  line-height: 50px;
  white-space: nowrap; 
  &:hover {
    outline: 1px solid blue;
  }
`;

export interface TableDataProps {
}

type Props = TableDataProps & WrapperProps;

export default class TableData extends React.Component<Props> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}
