import { createAction } from "document-model/core";
import {
  EditChatNameInputSchema,
  EditChatDescriptionInputSchema,
} from "../schema/zod.js";
import type { EditChatNameInput, EditChatDescriptionInput } from "../types.js";
import type {
  EditChatNameAction,
  EditChatDescriptionAction,
} from "./actions.js";

export const editChatName = (input: EditChatNameInput) =>
  createAction<EditChatNameAction>(
    "EDIT_CHAT_NAME",
    { ...input },
    undefined,
    EditChatNameInputSchema,
    "global",
  );

export const editChatDescription = (input: EditChatDescriptionInput) =>
  createAction<EditChatDescriptionAction>(
    "EDIT_CHAT_DESCRIPTION",
    { ...input },
    undefined,
    EditChatDescriptionInputSchema,
    "global",
  );
