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
} from "../../store/youtube-dl/action";
import { AllDownloads, Download } from "../../api/youtube-dl/responseMessage";
import { rpcAddToQueue, rpcGetAllDownloads } from "../../api/youtube-dl";

export const Container = styled.div`
  background-color: #1D1D1D;
  text-align: center;
  overflow-y: auto;
`;

export const Form = styled.form`
  margin: 10px;
`;

export const Input = styled.input`
  width: 450px;
  font-size: 1.3em;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  outline: none;
  border: none;
`;

export const SearchButton = styled.button`
  font-size: 1.3em;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #F7941D;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const DownloadList = styled.ul`
  height: 90%;
  margin-top: 50px;
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

export const ListItem = styled.li`
  margin-top: 5px;
  margin-bottom: 5px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
`;

const mapStateToProps = (state: StoreState) => ({
  youtubeDL: state.youtubeDL,
  api: state.api,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setSearchTerm,
  }, dispatch)
);

interface State {
  downloads: Download[];
}

type YoutubeDLProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
  };

class YoutubeDL extends React.Component<YoutubeDLProps> {
  state: State = {
    downloads: [],
  }

  GET_ALL_DOWNLOADS_MILLISECONDS = 500;

  constructor(props: YoutubeDLProps) {
    super(props);
    setInterval(this.getAllDownloads, this.GET_ALL_DOWNLOADS_MILLISECONDS);
  }

  handleSearch = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const youtubeUrl: string = data.get("youtubeUrlInput") as string;
    this.download(youtubeUrl);
  }

  download = (url: string) => {
    rpcAddToQueue(this.props.api.gatewayEndpoint, { url });
  }

  getAllDownloads = () => {
    rpcGetAllDownloads(this.props.api.gatewayEndpoint, {})
      .then(allDownloads => {
        if (allDownloads.downloads.length > 0) {
          this.setState({ downloads: allDownloads.downloads });
        } else {
          this.setState({ downloads: [] });
        }
      })
      .catch(error => {
        console.error("Failed to get all downloads from youtubedl service: ", error);
      });
  }

  render() {
    return (
      <Container>
        <Form
          onSubmit={this.handleSearch}
        >
          <Input
            autoFocus
            id="search"
            name="youtubeUrlInput"
            type="text"
            placeholder="https://www.youtube.com/watch?v=n32oindn09"
            defaultValue={this.props.youtubeDL.searchTerm}
          />
          <SearchButton
            type="submit"
          >
            <FontAwesomeIcon
              icon="search"
              size="xs"
              color="white"
            />
          </SearchButton>
        </Form>
        <DownloadList>
          {this.state.downloads.length > 0 && this.state.downloads.map((item, index) => (
            <ListItem key={index + '-' + item.url}>{item.url} | {item.state.status} | {item.state.percentStr} | {item.state.etaStr}</ListItem>
          ))}
        </DownloadList>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YoutubeDL);