import React from "react";
import styled from "styled-components";

interface WrapperProps {
  header?: boolean;
  height?: string;
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
}

const Wrapper = styled.div<WrapperProps>`
  ${props => props.header ? "grid-area: header" : null};
  height: ${props => props.height ? props.height : "50px"};
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  border-top: 1px solid ${props => props.borderTopColor ? props.borderTopColor : "transparent"};
  border-bottom: 1px solid ${props => props.borderBottomColor ? props.borderBottomColor : "transparent"};
  border-left: 1px solid ${props => props.borderLeftColor ? props.borderLeftColor : "transparent"};
  border-right: 1px solid ${props => props.borderRightColor ? props.borderRightColor : "transparent"};
`;

export interface TableRowProps {
}

type Props = TableRowProps & WrapperProps;

export default class TableRow extends React.Component<Props> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}