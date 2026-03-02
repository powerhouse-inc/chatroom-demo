import { createAction } from "document-model/core";
import {
  AddMessageInputSchema,
  AddEmojiReactionInputSchema,
  RemoveEmojiReactionInputSchema,
} from "../schema/zod.js";
import type {
  AddMessageInput,
  AddEmojiReactionInput,
  RemoveEmojiReactionInput,
} from "../types.js";
import type {
  AddMessageAction,
  AddEmojiReactionAction,
  RemoveEmojiReactionAction,
} from "./actions.js";

export const addMessage = (input: AddMessageInput) =>
  createAction<AddMessageAction>(
    "ADD_MESSAGE",
    { ...input },
    undefined,
    AddMessageInputSchema,
    "global",
  );

export const addEmojiReaction = (input: AddEmojiReactionInput) =>
  createAction<AddEmojiReactionAction>(
    "ADD_EMOJI_REACTION",
    { ...input },
    undefined,
    AddEmojiReactionInputSchema,
    "global",
  );

export const removeEmojiReaction = (input: RemoveEmojiReactionInput) =>
  createAction<RemoveEmojiReactionAction>(
    "REMOVE_EMOJI_REACTION",
    { ...input },
    undefined,
    RemoveEmojiReactionInputSchema,
    "global",
  );
