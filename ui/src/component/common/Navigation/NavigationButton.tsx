import React from "react";
import styled from "styled-components";
import {
  withRouter,
  RouteComponentProps,
} from "react-router-dom";

const Container = styled.div`
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  user-select: none;
  user-drag: none;
  &:hover {
    cursor: pointer;
    background-color: #4b4f59;
  }
`;

const Text = styled.span`
  color: white;
  user-select: none;
  user-drag: none;
  -webkit-user-drag: none;
`;

export interface NavigationButtonProps extends RouteComponentProps {
  to: string;
  text: string;
}

class NavigationButton extends React.Component<NavigationButtonProps> {
  handleOnClick = () => {
    this.props.history.push(this.props.to);
  }

  render() {
    const { text } = this.props;
    return (
      <Container onClick={this.handleOnClick}>
        <Text>{text}</Text>
      </Container>
    );
  }
}

export default withRouter(NavigationButton);