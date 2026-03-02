import type { PHDocument, PHBaseState } from "document-model";
import type { ChatRoomAction } from "./actions.js";
import type { ChatRoomState as ChatRoomGlobalState } from "./schema/types.js";

type ChatRoomLocalState = Record<PropertyKey, never>;

type ChatRoomPHState = PHBaseState & {
  global: ChatRoomGlobalState;
  local: ChatRoomLocalState;
};
type ChatRoomDocument = PHDocument<ChatRoomPHState>;

export * from "./schema/types.js";

export type {
  ChatRoomGlobalState,
  ChatRoomLocalState,
  ChatRoomPHState,
  ChatRoomAction,
  ChatRoomDocument,
};
