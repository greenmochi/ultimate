import { postFetch } from "../common/fetch";
import { 
  DownloadItemMsg,
} from "./requestMessage";
import { 
  DownloadItemResponse,
} from "./responseMessage";

const endpoints = {
  ADD_TO_QUEUE: "youtubedl/AddToQueue",
  REMOVE_FROM_QUEUE: "youtubedl/RemoveFromQueue",
  GET_ALL_DOWNLOADS: "youtubedl/GetAllDownloads",
};

export async function rpcAddToQueue(baseUri: string, msg: DownloadItemMsg): Promise<DownloadItemResponse> {
  const fullUri = baseUri + "/" + endpoints.ADD_TO_QUEUE;
  return postFetch(fullUri, msg)
    .then(resp => resp.json())
    .then(data => {
      const downloadItemResponse: DownloadItemResponse = {
        id: data["id"],
      };
      return downloadItemResponse;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
}