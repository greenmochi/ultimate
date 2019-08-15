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
  margin: auto;
  outline: none;
`;

export const Controls = styled.div`
  display: grid;
  grid-area: controls;
  grid-template-areas:
    "loadplaylist backward forward";
`;

export const LoopButton = styled.button`
`;

export const LoadPlaylistButtonWrapper = styled.div`
  grid-area: loadplaylist;
`;

export const LoadPlaylistButton = styled.button`
  background: #D35400;
  color: white;
  border: none;
  font-size: 14px;
  padding: 10px 20px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
  cursor: pointer;
  outline: none;
  &:active {
    transform: scale(0.95);
  }
`;

export const BackwardButtonWrapper = styled.div`
  grid-area: backward;
  justify-self: right;
`;

export const BackwardButton = styled.button`
  color: rgba(255, 255, 255);
  background-color: transparent;
  border: none;
  outline-style: none;
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, .5);
  }
`;

export const ForwardButtonWrapper = styled.div`
  grid-area: forward;
`;

export const ForwardButton = styled.button`
  color: rgba(255, 255, 255);
  background-color: transparent;
  border: none;
  outline-style: none;
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, .5);
  }
`;

export const Playlist = styled.ul`
  grid-area: playlist;
  height: 90%;
  margin-top: 10%;
  padding-left: 15px;
  padding-right: 15px;
  color: white;
  overflow-y: hidden;
  text-align: left;
  list-style-type: none;
  &:hover {
    overflow-y: scroll;
  }
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
  shouldLoop: boolean;
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
    shouldLoop: false,
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

  handleLoadPlaylist = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.loadPlaylist();
  }

  handleBackward = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
  
  handleForward = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  next = (nextIndex: number) => {
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

  handleLoop = () => {
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
            onClick={() => this.next(i)}
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
          <LoadPlaylistButtonWrapper>
            <LoadPlaylistButton
              onClick={this.handleLoadPlaylist}
            >
              Load Playlist
            </LoadPlaylistButton>
          </LoadPlaylistButtonWrapper>
          <BackwardButtonWrapper>
            <BackwardButton
              onClick={this.handleBackward}
            >
              <FontAwesomeIcon
                icon="step-backward"
                size="lg"
              />
            </BackwardButton>
          </BackwardButtonWrapper>
          <ForwardButtonWrapper>
            <ForwardButton
              onClick={this.handleForward}
            >
              <FontAwesomeIcon
                icon="step-forward"
                size="lg"
              />
            </ForwardButton>
          </ForwardButtonWrapper>
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