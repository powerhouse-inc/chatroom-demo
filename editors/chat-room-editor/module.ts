import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the Todo List document type */
export const ChatRoomEditor: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/chat-room"],
  config: {
    id: "chat-room-editor",
    name: "chat-room-editor",
  },
};
