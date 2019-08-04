import React from "react";
import styled from "styled-components";

interface WrapperProps {
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
}

const Wrapper = styled.div<WrapperProps>`
  grid-area: body;
  overflow-y: scroll;
  height: auto;
  border-top: 1px solid ${props => props.borderTopColor ? props.borderTopColor : "transparent"};
  border-bottom: 1px solid ${props => props.borderBottomColor ? props.borderBottomColor : "transparent"};
  border-left: 1px solid ${props => props.borderLeftColor ? props.borderLeftColor : "transparent"};
  border-right: 1px solid ${props => props.borderRightColor ? props.borderRightColor : "transparent"};
  margin-top: 2px;
  ::-webkit-scrollbar {
    width: 10px;
  }
  &:hover::-webkit-scrollbar {
  }
  ::-webkit-scrollbar-track {
    background: transparent; 
  }
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`;

export interface TableBodyProps {
}

type Props = TableBodyProps & WrapperProps;

export default class TableBody extends React.Component<Props> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}
