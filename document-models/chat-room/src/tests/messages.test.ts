/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import {
  reducer,
  utils,
  isChatRoomDocument,
  addMessage,
  AddMessageInputSchema,
  addEmojiReaction,
  AddEmojiReactionInputSchema,
  removeEmojiReaction,
  RemoveEmojiReactionInputSchema,
} from "@powerhousedao/chatroom-package/document-models/chat-room";

describe("Messages Operations", () => {
  it("should handle addMessage operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddMessageInputSchema());

    const updatedDocument = reducer(document, addMessage(input));

    expect(isChatRoomDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_MESSAGE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addEmojiReaction operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddEmojiReactionInputSchema());

    const updatedDocument = reducer(document, addEmojiReaction(input));

    expect(isChatRoomDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_EMOJI_REACTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeEmojiReaction operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveEmojiReactionInputSchema());

    const updatedDocument = reducer(document, removeEmojiReaction(input));

    expect(isChatRoomDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_EMOJI_REACTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
