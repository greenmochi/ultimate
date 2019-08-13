import { postFetch } from "../common/fetch";
import {
  UsernameMsg,
  SearchQueryMsg,
  AnimeLinkMsg,
  AnimeIDMsg,
} from "./requestMessage";
import { 
  UserAnimeList, 
  UserAnime,
  AnimeSearchResult,
  Anime,
} from "./responseMessage";

const endpoints = {
  USER_ANIME_LIST: "myanimelist/GetUserAnimeList",
  SEARCH_ANIME: "myanimelist/SearchAnime",
  GET_ANIME_BY_LINK: "myanimelist/GetAnimeByLink",
  GET_ANIME_BY_ID: "myanimelist/GetAnimeByID",
};

export async function fetchUserAnimeList(baseUri: string, msg: UsernameMsg): Promise<UserAnimeList> {
  const fullUri = baseUri + "/" + endpoints.USER_ANIME_LIST;
  return postFetch(fullUri, msg)
    .then(resp => resp.json())
    .then(json => {
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

export async function fetchSearchAnime(baseUri: string, msg: SearchQueryMsg): Promise<AnimeSearchResult[]> {
  const fullUri = baseUri + "/" + endpoints.SEARCH_ANIME;
  return postFetch(fullUri, msg)
    .then(resp => resp.json())
    .then(json => {
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

export async function fetchGetAnimeByLink(baseUri: string, msg: AnimeLinkMsg): Promise<Anime> {
  const fullUri = baseUri + "/" + endpoints.GET_ANIME_BY_LINK;
  return postFetch(fullUri, msg)
    .then(resp => resp.json())
    .then(json => {
      let anime: Anime = {
        id: json["id"],
        url: json["url"],
        title: json["title"],
        imgSrc: json["img_src"],
        imgBlob: json["img_blob"],
        description: json["description"],
        altTitles: {
          synonyms: json["alt_titles"]["synonyms"],
          english: json["alt_titles"]["english"],
          japanese: json["alt_titles"]["japanese"],
        },
        info: {
          type: json["info"]["type"],
          episodes: json["info"]["episodes"],
          status: json["info"]["status"],
          aired: json["info"]["aired"],
          premiered: json["info"]["premiered"],
          broadcast: json["info"]["broadcast"],
          producers: json["info"]["producers"],
          licensors: json["info"]["licensors"],
          studios: json["info"]["studios"],
          source: json["info"]["source"],
          genres: json["info"]["genres"],
          duration: json["info"]["duration"],
          rating: json["info"]["rating"],
        },
        stats: {
          score: json["stats"]["score"],
          ranked: json["stats"]["ranked"],
          popularity: json["stats"]["popularity"],
          members: json["stats"]["members"],
          favorites: json["stats"]["favorites"],
        },
      };
      return anime;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
}

export async function fetchGetAnimeByID(baseUri: string, msg: AnimeIDMsg): Promise<Response> {
  const fullUri = baseUri + "/" + endpoints.GET_ANIME_BY_ID;
  return postFetch(fullUri, msg)
    .then(resp => resp.json())
    .then(json => {
      let anime: Anime = {
        id: json["id"],
        url: json["url"],
        title: json["title"],
        imgSrc: json["img_src"],
        imgBlob: json["img_blob"],
        description: json["description"],
        altTitles: {
          synonyms: json["alt_titles"]["synonyms"],
          english: json["alt_titles"]["english"],
          japanese: json["alt_titles"]["japanese"],
        },
        info: {
          type: json["info"]["type"],
          episodes: json["info"]["episodes"],
          status: json["info"]["status"],
          aired: json["info"]["aired"],
          premiered: json["info"]["premiered"],
          broadcast: json["info"]["broadcast"],
          producers: json["info"]["producers"],
          licensors: json["info"]["licensors"],
          studios: json["info"]["studios"],
          source: json["info"]["source"],
          genres: json["info"]["genres"],
          duration: json["info"]["duration"],
          rating: json["info"]["rating"],
        },
        stats: {
          score: json["stats"]["score"],
          ranked: json["stats"]["ranked"],
          popularity: json["stats"]["popularity"],
          members: json["stats"]["members"],
          favorites: json["stats"]["favorites"],
        },
      };
      return anime;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
}