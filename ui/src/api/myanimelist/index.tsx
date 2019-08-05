import { 
  UserAnimeList, 
  UserAnime,
  AnimeSearchResult,
} from "./responseType";

const endpoints = {
  USER_ANIME_LIST: "myanimelist/GetUserAnimeList",
  SEARCH_ANIME: "myanimelist/SearchAnime",
  GET_ANIME_BY_LINK: "myanimelist/GetAnimeByLink",
  GET_ANIME_BY_ID: "myanimelist/GetAnimeByID",
};

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

type MyAnimeListMsgTypes =
  | UsernameMsg
  | SearchQueryMsg
  | AnimeLinkMsg
  | AnimeIDMsg
  ;

function postFetch(endpoint: string, body: MyAnimeListMsgTypes): Promise<Response> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(endpoint, options)
}

export async function fetchUserAnimeList(baseURI: string, msg: UsernameMsg): Promise<UserAnimeList> {
  const fullURI = baseURI + "/" + endpoints.USER_ANIME_LIST;
  return postFetch(fullURI, msg)
    .then(resp => resp.json())
    .then((json: any) => {
      let userAnimeList: UserAnimeList = {
        username: json["username"],
      };
      userAnimeList.userAnime = json["user_anime"].map((u: any): UserAnime => ({
        status: u["status"] ? u["status"] : -1,
        score: u["score"] ? u["score"] : -1,
        tags: u["tags"] ? u["tags"] : "",
        isRewatching: u["is_rewatching"] ? u["is_rewatching"] : "",
        numWatchedEpisodes: u["num_watched_episodes"] ? u["num_watched_episodes"] : "",
        animeTitle: u["anime_title"] ? u["anime_title"] : "",
        animeNumEpisodes: u["anime_num_episodes"] ? u["anime_num_episodes"] : -1,
        animeAiringStatus: u["anime_airing_status"] ? u["anime_airing_status"] : -1,
        animeID: u["anime_id"] ? u["anime_id"] : -1,
        animeStudios: u["anime_studios"] ? u["anime_studios"] : "",
        animeLicensors: u["anime_licensors"] ? u["anime_licensors"] : "",
        animeSeason: {
          year: u["anime_season"]["year"] ? u["anime_season"]["year"] : 0,
          season: u["anime_season"]["season"] ? u["anime_season"]["season"] : "",
        },
        hasEpisodeVideo: u["has_episode_video"] ? u["has_episode_video"] : false,
        hasPromotionVideo: u["has_promotion_video"] ? u["has_promotion_video"] : false,
        hasVideo: u["has_video"] ? u["has_video"] : false,
        videoURL: u["video_url"] ? u["video_url"] : "",
        animeURL: u["anime_url"] ? u["anime_url"] : "",
        animeImagePath: u["anime_image_path"] ? u["anime_image_path"] : "",
        isAddedToList: u["is_added_to_list"] ? u["is_added_to_list"] : false,
        animeMediaTypeString: u["anime_media_rating_string"] ? u["anime_media_rating_string"] : "",
        animeMPAARatingString: u["anime_mpaa_rating_string"] ? u["anime_mpaa_rating_string"] : "",
        startDateString: u["start_date_string"] ? u["start_date_string"] : "",
        finishDateString: u["finish_date_string"] ? u["finish_date_string"] : "",
        animeStartDateString: u["anime_start_date_string"] ? u["anime_start_date_string"] : "",
        animeEndDateString: u["anime_end_date_string"] ? u["anime_end_date_string"] : "",
        daysString: u["days_string"] ? u["days_string"] : -1,
        storageString: u["storage_string"] ? u["storage_string"] : "",
        priorityString: u["priority_string"] ? u["priority_string"] : "",
      }));
      return userAnimeList;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
}

export async function fetchSearchAnime(baseURI: string, msg: SearchQueryMsg): Promise<AnimeSearchResult[]> {
  const fullURI = baseURI + "/" + endpoints.SEARCH_ANIME;
  return postFetch(fullURI, msg)
    .then(resp => resp.json())
    .then((json: any) => {
      let searchResults: AnimeSearchResult[] = json["results"].map((u: any): AnimeSearchResult => ({
        imgSrc: u["img_src"] ? u["img_src"] : "",
        imgBlob: u["img_blob"] ? u["img_blob"] : "",
        title: u["title"] ? u["title"] : "",
        link: u["link"] ? u["link"] : "",
        synopsis: u["synopsis"] ? u["synopsis"] : "",
        type: u["type"] ? u["type"] : "",
        numEpisodes: u["num_episodes"] ? u["num_episodes"] : "",
        score: u["score"] ? u["score"] : "",
      }));
      return searchResults;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
}

export async function fetchGetAnimeByLink(baseURI: string, msg: AnimeLinkMsg): Promise<Response> {
  const fullURI = baseURI + "/" + endpoints.GET_ANIME_BY_LINK;
  return postFetch(fullURI, msg);
}

export async function fetchGetAnimeByID(baseURI: string, msg: AnimeIDMsg): Promise<Response> {
  const fullURI = baseURI + "/" + endpoints.GET_ANIME_BY_ID;
  return postFetch(fullURI, msg);
}