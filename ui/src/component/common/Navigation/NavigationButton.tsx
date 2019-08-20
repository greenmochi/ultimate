import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import styled from "styled-components";

import { StoreState } from "../../../store";
import { setLocation } from "../../../store/navigation/action";

interface ContainerProps {
  focus?: boolean;
}
const Container = styled.div<ContainerProps>`
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  outline: 1px solid ${props => props.focus ? "#30fffe" : "none"};
  outline-offset: -2px;
  transition: all 250ms ease;
  user-select: none;
  user-drag: none;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.focus ? "none" : "#4b4f59"};
  }
  &:active {
    background-color: ${props => props.focus ? "none" : "#383b42"};
  }
`;

const Text = styled.span`
  color: white;
  user-select: none;
  user-drag: none;
  -webkit-user-drag: none;
`;

const mapStateToProps = (state: StoreState) => ({
  navigation: state.navigation,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setLocation: setLocation,
  }, dispatch)
);

export type NavigationButtonProps = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    to: string;
    text: string;
  }

class NavigationButton extends React.Component<NavigationButtonProps> {
  handleOnClick = () => {
    this.props.setLocation(this.props.to);
    this.props.history.push(this.props.to);
  }

  render() {
    const { 
      to, 
      text, 
    } = this.props;
    return (
      <Container 
        onClick={this.handleOnClick}
        focus={this.props.navigation.location === to}
      >
        <Text>{text}</Text>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(NavigationButton));