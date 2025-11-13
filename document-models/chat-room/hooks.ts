import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useDocumentById,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  ChatRoomDocument,
  ChatRoomAction,
} from "@powerhousedao/chatroom-package/document-models/chat-room";
import { isChatRoomDocument } from "./gen/document-schema.js";

/** Hook to get a ChatRoom document by its id */
export function useChatRoomDocumentById(
  documentId: string | null | undefined,
):
  | [ChatRoomDocument, DocumentDispatch<ChatRoomAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isChatRoomDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ChatRoom document */
export function useSelectedChatRoomDocument():
  | [ChatRoomDocument, DocumentDispatch<ChatRoomAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useSelectedDocument();
  if (!isChatRoomDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get all ChatRoom documents in the selected drive */
export function useChatRoomDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isChatRoomDocument);
}

/** Hook to get all ChatRoom documents in the selected folder */
export function useChatRoomDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isChatRoomDocument);
}
