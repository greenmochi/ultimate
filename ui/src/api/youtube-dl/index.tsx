import { postFetch } from "../common/fetch";
import { DownloadItemMsg, DownloadIdMsg, AllDownloadsMsg } from "./requestMessage";
import { DownloadItemResponse, DownloadRemoveResponse, AllDownloads, Download } from "./responseMessage";

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
        id: data["id"] ? data["id"] : "",
      };
      return downloadItemResponse;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export async function rpcRemoveFromQueue(baseUri: string, msg: DownloadIdMsg): Promise<DownloadRemoveResponse> {
  const fullUri = baseUri + "/" + endpoints.ADD_TO_QUEUE;
  return postFetch(fullUri, msg)
    .then(resp => resp.json())
    .then(data => {
      const response: DownloadRemoveResponse = {
        message: data["message"] ? data["message"] : "",
      };
      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export async function rpcGetAllDownloads(baseUri: string, msg: AllDownloadsMsg): Promise<AllDownloads> {
  const fullUri = baseUri + "/" + endpoints.GET_ALL_DOWNLOADS;
  return postFetch(fullUri, msg)
    .then(resp => resp.json())
    .then(data => {
      const downloads: Download[] = data["downloads"].map((u: any) => ({
        url: u["url"] ? u["url"] : "",
        title: u["title"] ? u["title"] : "",
        state: {
          status: u["state"]["status"] ? u["state"]["status"] : "",
          filename: u["state"]["filename"] ? u["state"]["filename"] : "",
          etaStr: u["state"]["eta_str"] ? u["state"]["eta_str"] : "",
          percentStr: u["state"]["percent_str"] ? u["state"]["percent_str"] : "",
          speedStr: u["state"]["speed_str"] ? u["state"]["speed_str"] : "",
          totalBytesStr: u["state"]["total_bytes_str"] ? u["state"]["total_bytes_str"] : "",
        },
      }));
      const allDownloads: AllDownloads = {
        downloads,
      };
      return allDownloads;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}