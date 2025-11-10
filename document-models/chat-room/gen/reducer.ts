// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { ChatRoomPHState } from "chatroom-package/document-models/chat-room";

import { chatRoomMessagesOperations } from "../src/reducers/messages.js";
import { chatRoomSettingsOperations } from "../src/reducers/settings.js";

import {
  AddMessageInputSchema,
  AddEmojiReactionInputSchema,
  RemoveEmojiReactionInputSchema,
  EditChatNameInputSchema,
  EditChatDescriptionInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<ChatRoomPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "ADD_MESSAGE":
      AddMessageInputSchema().parse(action.input);
      chatRoomMessagesOperations.addMessageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_EMOJI_REACTION":
      AddEmojiReactionInputSchema().parse(action.input);
      chatRoomMessagesOperations.addEmojiReactionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_EMOJI_REACTION":
      RemoveEmojiReactionInputSchema().parse(action.input);
      chatRoomMessagesOperations.removeEmojiReactionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_CHAT_NAME":
      EditChatNameInputSchema().parse(action.input);
      chatRoomSettingsOperations.editChatNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_CHAT_DESCRIPTION":
      EditChatDescriptionInputSchema().parse(action.input);
      chatRoomSettingsOperations.editChatDescriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<ChatRoomPHState>(stateReducer);
