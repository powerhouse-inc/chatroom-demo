/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import {
  utils,
  initialGlobalState,
  initialLocalState,
  chatRoomDocumentType,
  isChatRoomDocument,
  assertIsChatRoomDocument,
  isChatRoomState,
  assertIsChatRoomState,
} from "chatroom/document-models/chat-room";
import { ZodError } from "zod";

describe("ChatRoom Document Model", () => {
  it("should create a new ChatRoom document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(chatRoomDocumentType);
  });

  it("should create a new ChatRoom document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isChatRoomDocument(document)).toBe(true);
    expect(isChatRoomState(document.state)).toBe(true);
  });
  it("should reject a document that is not a ChatRoom document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsChatRoomDocument(wrongDocumentType)).toThrow();
      expect(isChatRoomDocument(wrongDocumentType)).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  const wrongState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongState.state.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isChatRoomState(wrongState.state)).toBe(false);
    expect(assertIsChatRoomState(wrongState.state)).toThrow();
    expect(isChatRoomDocument(wrongState)).toBe(false);
    expect(assertIsChatRoomDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isChatRoomState(wrongInitialState.state)).toBe(false);
    expect(assertIsChatRoomState(wrongInitialState.state)).toThrow();
    expect(isChatRoomDocument(wrongInitialState)).toBe(false);
    expect(assertIsChatRoomDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isChatRoomDocument(missingIdInHeader)).toBe(false);
    expect(assertIsChatRoomDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isChatRoomDocument(missingNameInHeader)).toBe(false);
    expect(assertIsChatRoomDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isChatRoomDocument(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(assertIsChatRoomDocument(missingCreatedAtUtcIsoInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isChatRoomDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(false);
    expect(
      assertIsChatRoomDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
