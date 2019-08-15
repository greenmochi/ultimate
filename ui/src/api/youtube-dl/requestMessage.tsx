export interface DownloadItemMsg {
  url: string;
}

export interface DownloadIdMsg {
  id: string;
}

export interface AllDownloadsMsg {
}

export type YoutubedlMsgType =
  | DownloadItemMsg
  | DownloadIdMsg
  | AllDownloadsMsg
  ;