import { type Action } from "document-model";
import type {
  AddMessageInput,
  AddEmojiReactionInput,
  RemoveEmojiReactionInput,
} from "../types.js";

export type AddMessageAction = Action & {
  type: "ADD_MESSAGE";
  input: AddMessageInput;
};
export type AddEmojiReactionAction = Action & {
  type: "ADD_EMOJI_REACTION";
  input: AddEmojiReactionInput;
};
export type RemoveEmojiReactionAction = Action & {
  type: "REMOVE_EMOJI_REACTION";
  input: RemoveEmojiReactionInput;
};

export type ChatRoomMessagesAction =
  | AddMessageAction
  | AddEmojiReactionAction
  | RemoveEmojiReactionAction;
