import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { ChatRoomPHState } from "@powerhousedao/chatroom-package/document-models/chat-room";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "@powerhousedao/chatroom-package/document-models/chat-room";

/** Document model module for the Todo List document type */
export const ChatRoom: DocumentModelModule<ChatRoomPHState> = {
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
