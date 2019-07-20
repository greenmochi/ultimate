import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  margin-left: 15px;
  margin-right: 15px;
  color: red;
  height: 50px;
`;

export interface TableDataProps {
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
