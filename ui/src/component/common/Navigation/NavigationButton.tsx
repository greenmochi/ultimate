import React from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

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

const NonDragLink = styled(Link)`
  line-height: 50px;
  color: white;
  text-decoration: none;
  user-select: none;
  user-drag: none;
  -webkit-user-drag: none;
`;

const Text = styled.span`
  user-select: none;
  user-drag: none;
  -webkit-user-drag: none;
`;

export interface NavigationButtonProps {
  to: string;
  text: string;
}

export class NavigationButton extends React.Component<NavigationButtonProps> {
  state = {
    shouldRedirect: false,
  };

  handleOnClick = () => {
    this.setState({ shouldRedirect: true });
  }

  render() {
    const {
      to,
      text,
    } = this.props;

    if (this.state.shouldRedirect) {
      this.setState({ shouldRedirect: false });
      return <Redirect to={to} />
    }

    return (
      <Container onClick={this.handleOnClick}>
        <NonDragLink 
          to={to}
        >
          <Text>{text}</Text>
        </NonDragLink>
      </Container>
    );
  }
}