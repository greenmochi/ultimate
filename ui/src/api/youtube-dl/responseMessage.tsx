export interface DownloadItemResponse {
  id: string;
}

export interface DownloadRemoveResponse {
  message: string;
}

export interface AllDownloads {
  downloads: Download[];
}

export interface Download {
  url: string;
  title: string;
  state: DownloadState;
}

export interface DownloadState {
  status: string;
  filename: string;
  etaStr: string;
  percentStr: string;
  speedStr: string;
  totalBytesStr: string;
}