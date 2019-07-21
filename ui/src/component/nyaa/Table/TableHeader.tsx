import React from "react";
import styled from "styled-components";

interface WrapperProps {
  width?: string;
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
  textAlign?: string;
}

const Wrapper = styled.div<WrapperProps>`
  display: inline-block;
  width: ${props => props.width ? props.width : "50px"};
  border-top: 1px solid ${props => props.borderTopColor ? props.borderTopColor : "transparent"};
  border-bottom: 1px solid ${props => props.borderBottomColor ? props.borderBottomColor : "transparent"};
  border-left: 1px solid ${props => props.borderLeftColor ? props.borderLeftColor : "transparent"};
  border-right: 1px solid ${props => props.borderRightColor ? props.borderRightColor : "transparent"};
  margin-left: 5px;
  margin-right: 5px;
  color: white;
  text-align: ${props => props.textAlign ? props.textAlign : "center"};
  line-height: 2em;
`;

const Content = styled.span`
`;

export interface TableHeaderProps {
}

type Props = TableHeaderProps & WrapperProps;

export default class TableHeader extends React.Component<Props> {
  render() {
    return (
      <Wrapper {...this.props}>
        <Content>{this.props.children}</Content>
      </Wrapper>
    );
  }
}
