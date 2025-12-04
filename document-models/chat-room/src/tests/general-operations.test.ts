import { describe, it, expect, beforeEach } from "vitest";
import { generateId } from "document-model/core";
import {
  reducer,
  utils,
  addMessage,
  addEmojiReaction,
  removeEmojiReaction,
  editChatName,
  editChatDescription,
} from "../../gen/index.js";
import type {
  ChatRoomDocument,
  AddMessageInput,
  AddEmojiReactionInput,
  RemoveEmojiReactionInput,
  EditChatNameInput,
  EditChatDescriptionInput,
} from "../../gen/types.js";

describe("GeneralOperations Operations", () => {
  let document: ChatRoomDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  // Helper function to add a message for testing
  const addMessageHelper = (): [ChatRoomDocument, AddMessageInput] => {
    const input: AddMessageInput = {
      content: "Hello, World!",
      messageId: generateId(),
      sender: {
        id: "anon-user",
        name: null,
        avatarUrl: null,
      },
      sentAt: new Date().toISOString(),
    };

    const updatedDocument = reducer(document, addMessage(input));

    return [updatedDocument, input];
  };

  // Test adding a new message
  it("should handle addMessage operation", () => {
    const [updatedDocument, input] = addMessageHelper();

    // Verify the operation was recorded
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_MESSAGE");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);

    // Verify the message was added to state
    expect(updatedDocument.state.global.messages).toHaveLength(1);
    expect(updatedDocument.state.global.messages[0]).toMatchObject({
      id: input.messageId,
      content: input.content,
      sender: input.sender,
      sentAt: input.sentAt,
      reactions: [],
    });
  });

  // Test adding an emoji reaction
  it("should handle addEmojiReaction operation", () => {
    const [doc, addMessageInput] = addMessageHelper();

    let updatedDocument = doc;

    const addEmojiReactionInput: AddEmojiReactionInput = {
      messageId: addMessageInput.messageId,
      reactedBy: "anon-user",
      type: "THUMBS_UP",
    };

    updatedDocument = reducer(
      updatedDocument,
      addEmojiReaction(addEmojiReactionInput),
    );

    // Verify the operation was recorded
    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].action.type).toBe("ADD_EMOJI_REACTION");
    expect(updatedDocument.operations.global[1].action.input).toStrictEqual(
      addEmojiReactionInput,
    );
    expect(updatedDocument.operations.global[1].index).toEqual(1);

    // Verify the reaction was added
    expect(updatedDocument.state.global.messages[0].reactions).toHaveLength(1);
    expect(updatedDocument.state.global.messages[0].reactions?.[0]).toMatchObject({
      reactedBy: [addEmojiReactionInput.reactedBy],
      type: addEmojiReactionInput.type,
    });
  });

  // Test adding reaction to non-existing message
  it("should handle addEmojiReaction operation to a non existing message", () => {
    const input: AddEmojiReactionInput = {
      messageId: "invalid-message-id",
      reactedBy: "anon-user",
      type: "THUMBS_UP",
    };

    const updatedDocument = reducer(document, addEmojiReaction(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_EMOJI_REACTION");
    expect(updatedDocument.state.global.messages).toHaveLength(0);
  });

  // Test removing an emoji reaction
  it("should handle removeEmojiReaction operation", () => {
    const [doc, addMessageInput] = addMessageHelper();

    let updatedDocument = doc;

    const addEmojiReactionInput: AddEmojiReactionInput = {
      messageId: addMessageInput.messageId,
      reactedBy: "anon-user",
      type: "THUMBS_UP",
    };

    updatedDocument = reducer(
      updatedDocument,
      addEmojiReaction(addEmojiReactionInput),
    );

    const input: RemoveEmojiReactionInput = {
      messageId: addMessageInput.messageId,
      senderId: "anon-user",
      type: "THUMBS_UP",
    };

    updatedDocument = reducer(updatedDocument, removeEmojiReaction(input));

    // Verify the operation was recorded
    expect(updatedDocument.operations.global).toHaveLength(3);
    expect(updatedDocument.operations.global[2].action.type).toBe("REMOVE_EMOJI_REACTION");
    expect(updatedDocument.operations.global[2].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[2].index).toEqual(2);

    // Verify the reaction was removed
    expect(updatedDocument.state.global.messages[0].reactions).toHaveLength(0);
  });

  // Test editing chat name
  it("should handle editChatName operation", () => {
    const input: EditChatNameInput = {
      name: "New Chat Name",
    };

    const updatedDocument = reducer(document, editChatName(input));

    // Verify the operation was recorded
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("EDIT_CHAT_NAME");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);

    // Verify the name was updated
    expect(updatedDocument.state.global.name).toBe(input.name);
  });

  // Test editing chat description
  it("should handle editChatDescription operation", () => {
    const input: EditChatDescriptionInput = {
      description: "New Chat Description",
    };

    const updatedDocument = reducer(document, editChatDescription(input));

    // Verify the operation was recorded
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("EDIT_CHAT_DESCRIPTION");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);

    // Verify the description was updated
    expect(updatedDocument.state.global.description).toBe(input.description);
  });
});