import { type SignalDispatch } from "document-model";
import {
  type AddMessageAction,
  type AddEmojiReactionAction,
  type RemoveEmojiReactionAction,
  type EditChatNameAction,
  type EditChatDescriptionAction,
} from "./actions.js";
import { type ChatRoomState } from "../types.js";

export interface ChatRoomGeneralOperationsOperations {
  addMessageOperation: (
    state: ChatRoomState,
    action: AddMessageAction,
    dispatch?: SignalDispatch,
  ) => void;
  addEmojiReactionOperation: (
    state: ChatRoomState,
    action: AddEmojiReactionAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeEmojiReactionOperation: (
    state: ChatRoomState,
    action: RemoveEmojiReactionAction,
    dispatch?: SignalDispatch,
  ) => void;
  editChatNameOperation: (
    state: ChatRoomState,
    action: EditChatNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  editChatDescriptionOperation: (
    state: ChatRoomState,
    action: EditChatDescriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
}
