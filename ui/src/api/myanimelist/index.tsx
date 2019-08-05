const endpoints = {
  USER_ANIME_LIST: "myanimelist/GetUserAnimeList",
  SEARCH_ANIME: "myanimelist/SearchAnime",
};

export interface UsernameMsg {
  username: string;
}

export interface SearchQueryMsg {
  query: string;
}

type MyAnimeListMsgTypes =
  | UsernameMsg
  | SearchQueryMsg;

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

export async function fetchUserAnimeList(baseURI: string, msg: UsernameMsg): Promise<Response> {
  const fullURI = baseURI + "/" + endpoints.USER_ANIME_LIST;
  return postFetch(fullURI, msg);
}

export async function fetchSearchAnime(baseURI: string, msg: SearchQueryMsg): Promise<Response> {
  const fullURI = baseURI + "/" + endpoints.SEARCH_ANIME;
  return postFetch(fullURI, msg);
}