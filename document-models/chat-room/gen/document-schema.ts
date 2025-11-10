import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { chatRoomDocumentType } from "./document-type.js";
import { ChatRoomStateSchema } from "./schema/zod.js";
import type { ChatRoomDocument, ChatRoomPHState } from "./types.js";

/** Schema for validating the header object of a ChatRoom document */
export const ChatRoomDocumentHeaderSchema = BaseDocumentHeaderSchema.extend({
  documentType: z.literal(chatRoomDocumentType),
});

/** Schema for validating the state object of a ChatRoom document */
export const ChatRoomPHStateSchema = BaseDocumentStateSchema.extend({
  global: ChatRoomStateSchema(),
});

export const ChatRoomDocumentSchema = z.object({
  header: ChatRoomDocumentHeaderSchema,
  state: ChatRoomPHStateSchema,
  initialState: ChatRoomPHStateSchema,
});

/** Simple helper function to check if a state object is a ChatRoom document state object */
export function isChatRoomState(state: unknown): state is ChatRoomPHState {
  return ChatRoomPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a ChatRoom document state object */
export function assertIsChatRoomState(
  state: unknown,
): asserts state is ChatRoomPHState {
  ChatRoomPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a ChatRoom document */
export function isChatRoomDocument(
  document: unknown,
): document is ChatRoomDocument {
  return ChatRoomDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a ChatRoom document */
export function assertIsChatRoomDocument(
  document: unknown,
): asserts document is ChatRoomDocument {
  ChatRoomDocumentSchema.parse(document);
}
