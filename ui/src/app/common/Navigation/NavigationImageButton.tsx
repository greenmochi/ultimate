import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SNavigationImageButtonContainer = styled.div`
  display: block;
  width: 100%;
  height: 50px;
  &:hover {
    background-color: #4b4f59;
  }
`;

const SLink = styled(Link)`
  user-select: none;
  user-drag: none;
  -webkit-user-drag: none;
`;

const SImage = styled.img`
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
      <SNavigationImageButtonContainer>
        <SLink 
          to={to}
        >
          <SImage src={image} />
        </SLink>
      </SNavigationImageButtonContainer>
    );
  }
}