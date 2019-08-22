import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Container,
  Form,
  Input,
  SubmitButton,
  ResultsContainer,
} from "style/component/MyAnimeList/Search";
import { SearchProps } from "component/MyAnimeList/Search";
import Result from "component/MyAnimeList/Search/Result";

import { rpcSearchAnime } from "api/myanimelist";
import { AnimeSearchResult } from "api/myanimelist/responseMessage";

interface State {
  results: AnimeSearchResult[];
}

export default class Search extends React.Component<SearchProps> {
  state: State = {
    results: [],
  }
  
  handleSearch = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const input = data.get("search") as string;
    this.loadResults(input);
  } 

  loadResults = (term: string) => {
    rpcSearchAnime(this.props.api.gatewayEndpoint, { query: term })
      .then(results => {
        this.setState({ results: results });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const results: JSX.Element[] = [];
    if (this.state.results && this.state.results.length > 0) {
      this.state.results.forEach(result => {
        results.push(
          <Result
            imgBlob={result.imgBlob}
            imgSrc={result.imgSrc}
            link={result.link}
            numEpisodes={result.numEpisodes}
            score={result.score}
            synopsis={result.synopsis}
            title={result.title}
            type={result.type}
          />
        );
      })
    }
    return (
      <Container>
        <Form onSubmit={this.handleSearch}>
          <Input
            autoFocus
            name="search"
            type="text"
            placeholder="Boku no hero academia"
          />
          <SubmitButton type="submit">
            <FontAwesomeIcon
              icon="search"
              size="xs"
            />
          </SubmitButton>
        </Form>
        <ResultsContainer>
          {results}
        </ResultsContainer>
      </Container>
    );
  }
}