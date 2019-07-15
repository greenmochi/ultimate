import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: block;
  width: 100%;
  height: 50px;
  &:hover {
    background-color: #4b4f59;
  }
`;

const NonDragLink = styled(Link)`
  user-select: none;
  user-drag: none;
  -webkit-user-drag: none;
`;

const Image = styled.img`
  user-select: none;
  user-drag: none;
  -webkit-user-drag: none;
`;

export interface NavigationImageButtonProps {
  to: string;
  image: string;
}

export class NavigationImageButton extends React.Component<NavigationImageButtonProps> {
  render() {
    const {
      to,
      image,
    } = this.props;
    return (
      <Container>
        <NonDragLink 
          to={to}
        >
          <Image src={image} />
        </NonDragLink>
      </Container>
    );
  }
}