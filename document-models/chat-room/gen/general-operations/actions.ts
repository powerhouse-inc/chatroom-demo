import { type Action } from "document-model";
import type {
  AddMessageInput,
  AddEmojiReactionInput,
  RemoveEmojiReactionInput,
  EditChatNameInput,
  EditChatDescriptionInput,
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
export type EditChatNameAction = Action & {
  type: "EDIT_CHAT_NAME";
  input: EditChatNameInput;
};
export type EditChatDescriptionAction = Action & {
  type: "EDIT_CHAT_DESCRIPTION";
  input: EditChatDescriptionInput;
};

export type ChatRoomGeneralOperationsAction =
  | AddMessageAction
  | AddEmojiReactionAction
  | RemoveEmojiReactionAction
  | EditChatNameAction
  | EditChatDescriptionAction;
