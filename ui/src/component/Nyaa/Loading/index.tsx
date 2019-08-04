import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Heart = ({ className }: any) => (
  <FontAwesomeIcon className={className} icon="heart" color="#F64C72" size="10x" />
);

const bumpBump = keyframes`
  0% {
    transform: scale(0.1);
  }
  50% {
    transform: scale(1.0)
  }
  100% {
    transform: scale(0.1);
  }
`;

const Wrapper = styled(Heart)`
  animation: ${bumpBump} 2s linear infinite;
`;

export interface LoadingProps {
}

export default class Loading extends React.Component<LoadingProps> {
  render() {
    return (
      <Wrapper />
    );
  }
}