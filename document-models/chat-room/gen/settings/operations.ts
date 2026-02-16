import { type SignalDispatch } from "document-model";
import type {
  EditChatNameAction,
  EditChatDescriptionAction,
} from "./actions.js";
import type { ChatRoomState } from "../types.js";

export interface ChatRoomSettingsOperations {
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
