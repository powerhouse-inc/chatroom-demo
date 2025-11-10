import type { ChatRoomMessagesAction } from "./messages/actions.js";
import type { ChatRoomSettingsAction } from "./settings/actions.js";

export * from "./messages/actions.js";
export * from "./settings/actions.js";

export type ChatRoomAction = ChatRoomMessagesAction | ChatRoomSettingsAction;
