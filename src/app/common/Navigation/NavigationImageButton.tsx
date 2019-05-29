import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SNavigationImageButton = styled(Link)`
`;

const SImage = styled.img`
  background-color: white;

  :hover {
    background-color: grey;
  }
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
    console.log(to);
    return (
      <SNavigationImageButton 
        title="hi"
        to={to}
      >
        <SImage src={image} />
      </SNavigationImageButton>
    );
  }
}