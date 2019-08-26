import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "anime-nav"
    "anime-view";
  grid-template-rows: 50px auto;
  background-color: white;
  text-align: center;
  overflow-y: hidden;
`;

export const AnimeNavigation = styled.div`
  grid-area: anime-nav;
`;

export const AnimeView = styled.div`
  grid-area: anime-view;
`;