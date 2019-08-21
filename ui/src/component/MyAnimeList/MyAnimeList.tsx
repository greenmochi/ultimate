import React from "react";
import { Switch, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Container,
  TabMenu,
  Form,
  Input,
  SubmitButton,
} from "style/component/MyAnimeList";

import { MyAnimeListProps } from "component/MyAnimeList";
import Tab from "component/Tab";

import { rpcGetAnimeByLink } from "api/myanimelist";

export default class MyAnimeList extends React.Component<MyAnimeListProps> {
  handleOnSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const searchTerm: string = data.get("search") as string;
    this.props.setUsername(searchTerm);
    // this.props.loadUserAnimeList({username:"choco1drop"});
    // this.props.loadAnimeSearchResults({ query: "boku no hero" });
    // rpcGetAnimeByID("http://localhost:9990", {id: 37521})
    //   .then(anime => {
    //     console.log(anime);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    rpcGetAnimeByLink("http://localhost:9990", { link: "https://myanimelist.net/anime/37521/Vinland_Saga?sfdosd=dsfdsfdsf" })
      .then(anime => {
        console.log(anime);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { myAnimeList } = this.props;
    return (
      <Container>
        <TabMenu>
          <Tab
            title="Search"
            to={`${this.props.match.url}/search`}
          />
          <Tab
            title="Anime"
            to={`${this.props.match.url}/anime`}
          />
          <Tab
            title="List"
            to={`${this.props.match.url}/list`}
          />
        </TabMenu>
        <Switch>
          <Route
            path={`${this.props.match.url}/search`}
            render={() => (
              <div>
                penis
              </div>
            )}
          />
          <Route
            path={`${this.props.match.url}/anime`}
            render={() => (
              <div>
                penis 2
              </div>
            )}
          />
          <Route
            path={`${this.props.match.url}/list`}
            render={() => (
              <div>
                penis 3
              </div>
            )}
          />
        </Switch>

        <Form
          onSubmit={this.handleOnSubmit}
        >
          <Input
            autoFocus
            id="search"
            name="search"
            type="text"
            placeholder="Maroon 5 she will be loved"
            defaultValue={this.props.myAnimeList.username}
          />
          <SubmitButton
            type="submit"
          >
            <FontAwesomeIcon
              icon="search"
              size="xs"
              color="white"
            />
          </SubmitButton>
        </Form>
        {myAnimeList.userAnimeList.userAnime ? myAnimeList.userAnimeList.userAnime.map((userAnime) => (
          <span>id={userAnime.animeID} {userAnime.animeTitle}</span>
        )) : null}
      </Container>
    );
  }
}