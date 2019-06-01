import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SLink = styled(Link)`
`;

const SImage = styled.img`
  background-color: none;
  border-left: 5px solid #66FCF1;

  :hover {
    background-color: white;
  }

  :focus {
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
    return (
      <SLink 
        to={to}
      >
        <SImage src={image} />
      </SLink>
    );
  }
}