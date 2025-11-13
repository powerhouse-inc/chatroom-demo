import {
  MessageNotFoundError,
  MessageContentCannotBeEmptyError,
} from "../../gen/messages/error.js";
import type { ChatRoomMessagesOperations } from "@powerhousedao/chatroom-package/document-models/chat-room";

export const chatRoomMessagesOperations: ChatRoomMessagesOperations = {
  addMessageOperation(state, action) {
    if (action.input.content === "") {
      throw new MessageContentCannotBeEmptyError();
    }

    const newMessage = {
      id: action.input.messageId,
      sender: {
        id: action.input.sender.id,
        name: action.input.sender.name || null,
        avatarUrl: action.input.sender.avatarUrl || null,
      },
      content: action.input.content,
      sentAt: action.input.sentAt,
      reactions: [],
    };

    state.messages.push(newMessage);
  },
  addEmojiReactionOperation(state, action) {
    const message = state.messages.find((m) => m.id === action.input.messageId);
    if (!message) {
      throw new MessageNotFoundError(
        `Message with ID ${action.input.messageId} not found`,
      );
    }

    if (!message.reactions) {
      message.reactions = [];
    }

    const existingReaction = message.reactions.find(
      (r) => r.type === action.input.type,
    );

    if (existingReaction) {
      if (!existingReaction.reactedBy.includes(action.input.reactedBy)) {
        existingReaction.reactedBy.push(action.input.reactedBy);
      }
    } else {
      message.reactions.push({
        type: action.input.type,
        reactedBy: [action.input.reactedBy],
      });
    }
  },
  removeEmojiReactionOperation(state, action) {
    const message = state.messages.find((m) => m.id === action.input.messageId);
    if (!message) {
      throw new MessageNotFoundError(
        `Message with ID ${action.input.messageId} not found`,
      );
    }

    if (!message.reactions) {
      return;
    }

    const reactionIndex = message.reactions.findIndex(
      (r) => r.type === action.input.type,
    );
    if (reactionIndex === -1) {
      return;
    }

    const reaction = message.reactions[reactionIndex];
    const userIndex = reaction.reactedBy.indexOf(action.input.senderId);

    if (userIndex !== -1) {
      reaction.reactedBy.splice(userIndex, 1);

      if (reaction.reactedBy.length === 0) {
        message.reactions.splice(reactionIndex, 1);
      }
    }
  },
};
