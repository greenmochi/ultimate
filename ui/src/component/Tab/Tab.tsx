import React from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Title,
} from "./Tab.style";

type TabProps = {
  to: string,
  title: string,
};

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