import React from "react";

import {
  Container,
} from "style/component/MyAnimeList/Search/Result";

interface ResultProps {
  imgBlob: string;
  imgSrc: string;
  link: string;
  numEpisodes: string;
  score: string;
  synopsis: string;
  title: string;
  type: string;
}

export default function Result({
    imgBlob,
    imgSrc,
    link,
    numEpisodes,
    score,
    synopsis,
    title,
    type,
}: ResultProps) {
  return (
    <Container key={imgSrc}>
      {/* <span>{imgBlob}</span> */}
      <span>{imgSrc}</span>
      <span>{link}</span>
      <span>{numEpisodes}</span>
      <span>{score}</span>
      <span>{synopsis}</span>
      <span>{title}</span>
      <span>{type}</span>
    </Container>
  );
}