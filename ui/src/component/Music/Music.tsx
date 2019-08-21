import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Container,
  Video,
  Controls,
  LoadPlaylistButtonWrapper,
  LoadPlaylistButton,
  BackwardButtonWrapper,
  BackwardButton,
  ForwardButtonWrapper,
  ForwardButton,
  Playlist,
  Item,
} from "style/component/Music";
import { MusicProps } from "component/Music";

import { PlaylistItem } from "api/atlas/responseMessage";
import { rpcGetPlaylist } from "api/atlas";

interface State {
  playlistItems: PlaylistItem[];
  currentIndex: number;
  currentTrack: PlaylistItem;
  shouldLoop: boolean;
  volume: number;
}

export default class Music extends React.Component<MusicProps> {
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
      this.video.current.onvolumechange = () => {
        if (this.video.current) {
          this.setState({ volume: this.video.current.volume });
        }
      }
      this.video.current.onended = () => {
        if (this.video.current) {
          this.forward();
        }
      }
    }
  }

  handleLoadPlaylist = () => {
    this.loadPlaylist();
  }

  handleBackward = () => {
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

  handleForward = () => {
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
    rpcGetPlaylist(this.props.api.gatewayEndpoint, {})
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