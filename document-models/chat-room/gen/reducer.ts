// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { ChatRoomPHState } from "chatroom/document-models/chat-room";

import { chatRoomGeneralOperationsOperations } from "../src/reducers/general-operations.js";

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
      chatRoomGeneralOperationsOperations.addMessageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_EMOJI_REACTION":
      AddEmojiReactionInputSchema().parse(action.input);
      chatRoomGeneralOperationsOperations.addEmojiReactionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_EMOJI_REACTION":
      RemoveEmojiReactionInputSchema().parse(action.input);
      chatRoomGeneralOperationsOperations.removeEmojiReactionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_CHAT_NAME":
      EditChatNameInputSchema().parse(action.input);
      chatRoomGeneralOperationsOperations.editChatNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_CHAT_DESCRIPTION":
      EditChatDescriptionInputSchema().parse(action.input);
      chatRoomGeneralOperationsOperations.editChatDescriptionOperation(
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
