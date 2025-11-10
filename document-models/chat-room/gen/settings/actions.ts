import { type Action } from "document-model";
import type { EditChatNameInput, EditChatDescriptionInput } from "../types.js";

export type EditChatNameAction = Action & {
  type: "EDIT_CHAT_NAME";
  input: EditChatNameInput;
};
export type EditChatDescriptionAction = Action & {
  type: "EDIT_CHAT_DESCRIPTION";
  input: EditChatDescriptionInput;
};

export type ChatRoomSettingsAction =
  | EditChatNameAction
  | EditChatDescriptionAction;
