import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border-spacing: 0;
`;

export interface PanelProps {
}

export default class Panel extends React.Component<PanelProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}