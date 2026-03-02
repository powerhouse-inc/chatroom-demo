import type { DocumentModelModule } from "document-model";
import { ChatRoom } from "./chat-room/legacy/module.js";
import { ChatRoom as ChatRoomV1 } from "./chat-room/v1/module.js";

export const documentModels: DocumentModelModule<any>[] = [
  ChatRoom,
  ChatRoomV1,
];
