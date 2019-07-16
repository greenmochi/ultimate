export interface MyAnimeListState {
  username: string;
}

export const SET_USERNAME = "SET_USERNAME";

interface SetUsernameAction {
  type: typeof SET_USERNAME;
  payload: string;
}
export type MyAnimeListActionType = SetUsernameAction;