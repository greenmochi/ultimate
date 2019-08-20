import React from "react";
import { Switch, Route, RouteComponentProps, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { StoreState } from "../../store";
import { setSearchTerm } from "../../store/anime/action";

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
  anime: state.anime,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setSearchTerm,
  }, dispatch)
);

type AnimeProps = RouteComponentProps & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
  };

class Anime extends React.Component<AnimeProps> {
  handleOnSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let searchTerm: string = data.get("search") as string;
    this.props.setSearchTerm(searchTerm);
  }

  render() {
    console.log(this.props)
    return (
      <Container>
        <button><Link to="/anime/mal">mal</Link></button>
        <button><Link to="/anime/nyaa">nyaa</Link></button>
        <button><Link to="/anime/torrent">torrent</Link></button>
        <Switch>
          <Route
            path={`${this.props.match.url}/mal`}
            render={() => (
              <div>
                mal
              </div>
            )}
          />
          <Route
            path={`${this.props.match.url}/nyaa`}
            render={() => (
              <div>
                nyaa
              </div>
            )}
          />
          <Route
            path={`${this.props.match.url}/torrent`}
            render={() => (
              <div>
                torrent
              </div>
            )}
          />
          <Route/>
          <Route/>
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
            defaultValue={this.props.anime.searchTerm}
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
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Anime);