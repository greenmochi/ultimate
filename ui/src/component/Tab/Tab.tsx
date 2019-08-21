import React from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Title,
} from "style/component/Tab";
import { TabProps } from "component/Tab";

export default class Tab extends React.Component<TabProps> {
  render() {
    return (
      <Container>
        <Link to={this.props.to}>
          <Title>{this.props.title}</Title>
        </Link>
      </Container>
    );
  }
}