import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isChatRoomDocument,
  editChatName,
  editChatDescription,
  EditChatNameInputSchema,
  EditChatDescriptionInputSchema,
} from "@powerhousedao/chatroom-package/document-models/chat-room";

describe("SettingsOperations", () => {
  it("should handle editChatName operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditChatNameInputSchema());

    const updatedDocument = reducer(document, editChatName(input));

    expect(isChatRoomDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_CHAT_NAME",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editChatDescription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditChatDescriptionInputSchema());

    const updatedDocument = reducer(document, editChatDescription(input));

    expect(isChatRoomDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_CHAT_DESCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
