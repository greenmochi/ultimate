import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
`;

export interface ListItemProps {
}

export default class ListItem extends React.Component<ListItemProps> {
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.children}
      </Wrapper>
    );
  }
}