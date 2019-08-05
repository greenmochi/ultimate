export interface UserAnimeList {
  username?: string;
  userAnime?: UserAnime[];
}

export interface UserAnime {
  status: number;
  score: number;
  tags: string;
  isRewatching: string;
  numWatchedEpisodes: number;
  animeTitle: string;
  animeNumEpisodes: number;
  animeAiringStatus: number;
  animeID: number;
  animeStudios: string;
  animeLicensors: string;
  animeSeason: AnimeSeason;
  hasEpisodeVideo: boolean;
  hasPromotionVideo: boolean;
  hasVideo: boolean;
  videoURL: string;
  animeURL: string;
  animeImagePath: string;
  isAddedToList: boolean;
  animeMediaTypeString: string;
  animeMPAARatingString: string;
  startDateString: string;
  finishDateString: string;
  animeStartDateString: string;
  animeEndDateString: string;
  daysString: number;
  storageString: string;
  priorityString: string;
}

export interface AnimeSeason {
  year: number;
  season: string;
}

export interface AnimeSearchResult {
  imgSrc: string;
  // Keep the blob as type string and the original base it's in.
  // since we can just load in as a src for an img tag.
  imgBlob: string; 
  title: string;
  link: string;
  synopsis: string;
  type: string;
  numEpisodes: string;
  score: string;
}
