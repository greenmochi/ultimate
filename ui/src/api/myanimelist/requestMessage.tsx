export interface UsernameMsg {
  username: string;
}

export interface SearchQueryMsg {
  query: string;
}

export interface AnimeLinkMsg {
  link: string;  
}

export interface AnimeIDMsg {
  id: number;
}

export type MyAnimeListMsgType =
  | UsernameMsg
  | SearchQueryMsg
  | AnimeLinkMsg
  | AnimeIDMsg
  ;
