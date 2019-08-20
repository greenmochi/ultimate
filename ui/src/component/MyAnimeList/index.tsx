import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { StoreState } from "store";
import { setUsername, loadUserAnimeList, loadAnimeSearchResults } from "store/myanimelist/action";
import { rpcGetAnimeByID, rpcGetAnimeByLink } from "api/myanimelist";

export const Container = styled.div`
  background-color: white;
  text-align: center;
  overflow-y: auto;
`;

export const Form = styled.form`
  margin: 10px;
`;

export const Input = styled.input`
  font-size: 1.3em;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  outline: none;
`;

export const SubmitButton = styled.button`
  font-size: 1.3em;
  margin-left: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  background-color: #F7941D;
  border: none;
  outline: none;
  cursor: pointer;
`;

const mapStateToProps = (state: StoreState) => ({
  myAnimeList: state.myAnimeList,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setUsername,
    loadUserAnimeList,
    loadAnimeSearchResults,
  }, dispatch)
);

type MyAnimeListProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
  };

class MyAnimeList extends React.Component<MyAnimeListProps> {
  handleOnSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let searchTerm: string = data.get("search") as string;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAnimeList);