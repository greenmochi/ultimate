import { postFetch } from "api/common/fetch";
import { PlaylistRequestMsg } from "./requestMessage";
import { Playlist, PlaylistItem } from "./responseMessage";

const endpoints = {
  GET_PLAYLIST: "atlas/GetPlaylist",
}

export async function rpcGetPlaylist(baseUri: string, msg: PlaylistRequestMsg): Promise<Playlist> {
  const fullUri = baseUri + "/" + endpoints.GET_PLAYLIST;
  return postFetch(fullUri, msg)
    .then(resp => resp.json())
    .then(data => {
      const items = data["items"].map((u: any): PlaylistItem => ({
        filename: u["filename"] ? u["filename"] : "",
        path: u["path"] ? u["path"] : "",
      }));
      return { items };
    })
    .catch(error => {
      console.error(error);
      return error;
    });
}