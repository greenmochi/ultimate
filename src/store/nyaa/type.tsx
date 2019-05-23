export interface Message {
  name: string;
}

export interface NyaaState {
  messages: Message[];
}

export const SEND_MESSAGE = "SEND_MESSAGE";

interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: Message;
}

export type NyaaActionType = SendMessageAction;