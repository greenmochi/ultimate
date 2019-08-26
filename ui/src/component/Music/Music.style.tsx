import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "video      playlist"
    "controls   playlist";
  grid-template-rows: 90vh 10vh;
  grid-template-columns: auto 400px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
  text-align: center;
  overflow-y: auto;
`;

export const Video = styled.video`
  grid-area: video;
  width: 100%;
  margin-top: 50px;
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
