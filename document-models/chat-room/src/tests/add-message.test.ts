/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import { utils as documentModelUtils } from "document-model/document";

import utils from "../../gen/utils";
import {
  z,
  AddMessageInput,
  AddEmojiReactionInput,
  RemoveEmojiReactionInput,
} from "../../gen/schema";
import { reducer } from "../../gen/reducer";
import * as creators from "../../gen/add-message/creators";
import { ChatRoomDocument } from "../../gen/types";

describe("AddMessage Operations", () => {
  let document: ChatRoomDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addMessage operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: AddMessageInput = generateMock(z.AddMessageInputSchema());

    const updatedDocument = reducer(document, creators.addMessage(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_MESSAGE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addEmojiReaction operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: AddEmojiReactionInput = generateMock(
      z.AddEmojiReactionInputSchema(),
    );

    const updatedDocument = reducer(document, creators.addEmojiReaction(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "ADD_EMOJI_REACTION",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeEmojiReaction operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: RemoveEmojiReactionInput = generateMock(
      z.RemoveEmojiReactionInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.removeEmojiReaction(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "REMOVE_EMOJI_REACTION",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
