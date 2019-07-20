import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  margin-left: 15px;
  margin-right: 15px;
  color: white;
  height: 50px;
`;

const Content = styled.span`
`;

export interface TableHeaderProps {
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
