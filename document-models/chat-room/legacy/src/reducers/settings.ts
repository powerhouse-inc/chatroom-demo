import type { ChatRoomSettingsOperations } from "@powerhousedao/chatroom-package/document-models/chat-room";

export const chatRoomSettingsOperations: ChatRoomSettingsOperations = {
  editChatNameOperation(state, action) {
    state.name = action.input.name || "";
  },
  editChatDescriptionOperation(state, action) {
    state.description = action.input.description || "";
  },
};
