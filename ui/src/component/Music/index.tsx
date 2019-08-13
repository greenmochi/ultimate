import React from "react";
import { connect } from "react-redux";
import {
  bindActionCreators,
  Dispatch,
  AnyAction,
} from "redux";
import styled from "styled-components";
import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
  StoreState,
} from "../../store";
import {
  setSearchTerm,
} from "../../store/music/action";
import { PlaylistItem } from "../../api/atlas/responseMessage";
import { fetchGetPlaylist } from "../../api/atlas";

export const Container = styled.div`
  background-color: #1D1D1D;
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
  music: state.music,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setSearchTerm,
  }, dispatch)
);

type MusicProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
  };

interface State {
  playlistItems: PlaylistItem[];
}

class Music extends React.Component<MusicProps> {
  state: State = {
    playlistItems: [],
  }

  constructor(props: MusicProps) {
    super(props);
    fetchGetPlaylist("http://localhost:9990", {})
      .then(playlist => {
        this.setState({ playlistItems: playlist.items });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleOnSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let searchTerm: string = data.get("search") as string;
    this.props.setSearchTerm(searchTerm);
  }

  render() {
    let video = null;
    if (this.state.playlistItems.length > 0) {
      video = (
        <video
          controls
          preload="metadata"
        >
          <source
            src={"file:///" + this.state.playlistItems[0].path}
            type="video/webm"
          />
        </video>
      );
    } 

    return (
      <Container>
        {video}
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Music);