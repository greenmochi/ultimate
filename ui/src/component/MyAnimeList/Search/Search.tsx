import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Container,
  Form,
  Input,
  SubmitButton,
  ResultsContainer,
  Result,
} from "style/component/MyAnimeList/Search";
import { SearchProps } from "component/MyAnimeList/Search";

export default class MyAnimeList extends React.Component<SearchProps> {
  handleSearch = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const input = data.get("search") as string;
    console.log(input)
  } 

  render() {
    let d = [];
    for (let i = 0; i < 100; i++) {
      d.push(<Result><span className="poop">hi</span></Result>);
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
          {d}
        </ResultsContainer>
      </Container>
    );
  }
}