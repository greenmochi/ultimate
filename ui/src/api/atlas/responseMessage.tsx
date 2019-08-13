export interface Playlist {
  items: PlaylistItem[];
}

export interface PlaylistItem {
  filename: string;
  path: string;
}