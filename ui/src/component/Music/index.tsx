import React from "react";
import { connect } from "react-redux";
import {
  bindActionCreators,
  Dispatch,
  AnyAction,
} from "redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  StoreState,
} from "../../store";
import {
  setSearchTerm,
} from "../../store/music/action";
import { PlaylistItem } from "../../api/atlas/responseMessage";
import { fetchGetPlaylist } from "../../api/atlas";

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "video      playlist"
    "controls   playlist";
  grid-template-rows: 90vh 10vh;
  grid-template-columns: auto 400px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #1D1D1D;
  text-align: center;
  overflow-y: auto;
`;

export const Video = styled.video`
  grid-area: video;
  width: 100%;
  height: 100%;
  margin: auto;
  outline: none;
`;

export const Controls = styled.div`
  grid-area: controls;
`;

export const LoopButton = styled.button`
`;

export const LoadPlaylistButton = styled.button`
`;

export const ForwardButton = styled.button`
`;

export const BackwardButton = styled.button`
`;

export const Playlist = styled.ul`
  grid-area: playlist;
  height: 50%;
  padding-left: 15px;
  padding-right: 15px;
  color: white;
  text-align: left;
  list-style-type: none;
`;

interface ItemProps {
  focus?: boolean;
}
export const Item = styled.li<ItemProps>`
  margin-top: 5px;
  margin-bottom: 5px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  outline: ${props => props.focus && "1px solid #0075d5"};
`;

const mapStateToProps = (state: StoreState) => ({
  api: state.api, 
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
  currentIndex: number;
  currentTrack: PlaylistItem;
  volume: number;
}

class Music extends React.Component<MusicProps> {
  state: State = {
    playlistItems: [],
    currentIndex: 0,
    currentTrack: {
      filename: "",
      path: "",
    },
    volume: 0.1,
  }

  video: React.RefObject<HTMLVideoElement>;

  constructor(props: MusicProps) {
    super(props);

    this.video = React.createRef();

    this.loadPlaylist();
  }

  componentDidMount() {
    if (this.video.current) {
      this.video.current.volume = this.state.volume;
      this.video.current.onvolumechange = (_: Event) => {
        if (this.video.current) {
          this.setState({ volume: this.video.current.volume });
        }
      }
      this.video.current.onended = (_: Event) => {
        if (this.video.current) {
          this.forward();
        }
      }
    }
  }

  handleOnLoadPlaylist = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.loadPlaylist();
  }

  handleOnBackward = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.backward();
  }

  backward = () => {
    const numItems = this.state.playlistItems.length;
    // Stay within playlist items bounds [0, numItems - 1]
    const prevIndex = (this.state.currentIndex - 1) >= 0 ? this.state.currentIndex - 1 : numItems - 1;
    const prevTrack = this.state.playlistItems[prevIndex];
    this.setState({
      currentIndex: prevIndex,
      currentTrack: prevTrack,
    }, () => {
      if (this.video.current) {
        this.video.current.load();
      }
    });
  }
  
  handleOnForward = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.forward();
  }

  forward = () => {
    const numItems = this.state.playlistItems.length;
    const nextIndex = (this.state.currentIndex + 1) % numItems;
    const nextTrack = this.state.playlistItems[nextIndex];
    this.setState({
      currentIndex: nextIndex,
      currentTrack: nextTrack,
    }, () => {
      if (this.video.current) {
        this.video.current.load();
      }
    });
  }

  loadPlaylist = () => {
    fetchGetPlaylist(this.props.api.gatewayEndpoint, {})
      .then(playlist => {
        this.setState({ 
          playlistItems: playlist.items,
          currentIndex: 0,
          currentTrack: playlist.items.length > 0 && playlist.items[0],
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let playlistItems = null;
    if (this.state.playlistItems.length > 0) {
      playlistItems = this.state.playlistItems.map((item, i) => {  
        let shouldFocus = false;
        if (this.state.currentTrack.path === item.path) {
          shouldFocus = true;
        }
        return (
          <Item 
            key={`${i}-${item.filename}`}
            focus={shouldFocus}
            >
              {item.filename}
          </Item>
        );
      });
    }
    return (
      <Container>
        <Video
          ref={this.video}
          autoPlay
          controls
          preload="metadata"
        >
          {this.state.currentTrack && this.state.currentTrack.path &&
            <source
              src={"file:///" + this.state.currentTrack.path}
              type="video/webm"
            />
          }
        </Video>
        <Controls>
          <LoadPlaylistButton
            onClick={this.handleOnLoadPlaylist}
          >
            Load playlist
          </LoadPlaylistButton>
          <BackwardButton
            onClick={this.handleOnBackward}
          >
            <FontAwesomeIcon
              icon="step-backward"
              size="xs"
              color="white"
            />
          </BackwardButton>
          <FontAwesomeIcon
            icon="play-circle"
            size="xs"
            color="white"
          />
          <ForwardButton
            onClick={this.handleOnForward}
          >
            <FontAwesomeIcon
              icon="step-forward"
              size="xs"
              color="white"
            />
          </ForwardButton>
        </Controls>
        <Playlist>{playlistItems}</Playlist>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Music);