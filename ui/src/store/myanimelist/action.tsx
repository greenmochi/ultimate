import { 
  ActionCreator, 
  Action,
} from "redux";
import { ThunkResult } from "..";
import {
  UserAnimeList,
  SET_USERNAME, 
  SET_USER_ANIME_LIST, 
  FETCHING_USER_ANIME_LIST,
} from "./type";
import { 
  UsernameMsg, 
  fetchUserAnimeList,
} from "../../api/myanimelist";

export const setUsername: ActionCreator<Action> = (username: string) => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
}

export function loadUserAnimeList(msg: UsernameMsg): ThunkResult<void> {
  return async (dispatch, getState) => {
    dispatch(fetchingUserAnimeList(true));
    const baseURI = getState().api.gatewayEndpoint;
    await fetchUserAnimeList(baseURI, msg)
      .then(resp => resp.json())
      .then((json: any) => {
        let userAnimeList: UserAnimeList = {
          username: json["username"],
        };
        userAnimeList.userAnime = json["user_anime"].map((u: any) => ({
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
        dispatch(setUserAnimeList(userAnimeList));
      })
      .catch(error => {
        console.error(error)
      })
    dispatch(fetchingUserAnimeList(false));
  };
}

export const setUserAnimeList: ActionCreator<Action> = (userAnimeList: UserAnimeList) => {
  return {
    type: SET_USER_ANIME_LIST,
    payload: userAnimeList,
  };
}

export const fetchingUserAnimeList: ActionCreator<Action> = (fetching: boolean) => {
  return {
    type: FETCHING_USER_ANIME_LIST,
    payload: fetching,
  };
}