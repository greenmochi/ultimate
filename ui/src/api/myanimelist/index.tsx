const endpoints = {
  USER_ANIME_LIST: "myanimelist/GetUserAnimeList",
};

export interface UsernameMsg {
  username: string;
}

type MyAnimeListMsgTypes =
  | UsernameMsg;

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