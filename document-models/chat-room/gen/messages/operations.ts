import { type SignalDispatch } from "document-model";
import type {
  AddMessageAction,
  AddEmojiReactionAction,
  RemoveEmojiReactionAction,
} from "./actions.js";
import type { ChatRoomState } from "../types.js";

export interface ChatRoomMessagesOperations {
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
}
