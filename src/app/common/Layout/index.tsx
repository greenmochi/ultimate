import React from "react";
import styled from "styled-components";

const SLayout = styled.div`
  display: grid;
  grid-template-columns: 70px auto;
  grid-template-rows: 20px calc(100vh - 20px);
  grid-template-areas:
    "title-bar    title-bar"
    "navigation   app";
`;

export interface LayoutProps {
}

export default class Layout extends React.Component<LayoutProps> {
  render() {
    return (
      <SLayout>{this.props.children}</SLayout>
    );
  }
}