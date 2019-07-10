import React from "react";
import styled from "styled-components";

const STitleBarTitle = styled.div`
  text-align: center;
  color: #BBBBBB;
`;

export interface TitleBarTitleProps {
  title: string;
}

export default class TitleBarTitle extends React.Component<TitleBarTitleProps> {
  render() {
    return (
      <STitleBarTitle>{this.props.title}</STitleBarTitle>
    );
  }
}