import { MessageContentCannotBeEmpty } from "../../gen/general-operations/error.js";
import type { ChatRoomGeneralOperationsOperations } from "chatroom/document-models/chat-room";

// Export the operations object that implements all five ChatRoom operations
export const chatRoomGeneralOperationsOperations: ChatRoomGeneralOperationsOperations = {
  addMessageOperation(state, action) {
    // Validate that message content is not empty
    if (action.input.content === "") {
      throw new MessageContentCannotBeEmpty();
    }

    // Create new message with all required fields
    // Powerhouse uses Immer.js, so this "mutation" is actually immutable
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
    // Find the message to add reaction to
    const message = state.messages.find(
      (m) => m.id === action.input.messageId,
    );
    
    // Return early if message not found
    if (!message) {
      return state;
    }

    // Initialize reactions array if needed
    if (!message.reactions) {
      message.reactions = [];
    }

    // Check if this reaction type already exists
    const existingReaction = message.reactions.find(
      (r) => r.type === action.input.type,
    );

    if (existingReaction) {
      // Add user to existing reaction if not already present
      if (!existingReaction.reactedBy.includes(action.input.reactedBy)) {
        existingReaction.reactedBy.push(action.input.reactedBy);
      }
    } else {
      // Create new reaction type
      message.reactions.push({
        type: action.input.type,
        reactedBy: [action.input.reactedBy],
      });
    }
  },

  removeEmojiReactionOperation(state, action) {
    // Find the message
    const message = state.messages.find(
      (m) => m.id === action.input.messageId,
    );
    
    if (!message || !message.reactions) {
      return;
    }

    // Find the reaction to remove
    const reactionIndex = message.reactions.findIndex(
      (r) => r.type === action.input.type,
    );
    
    if (reactionIndex === -1) {
      return;
    }

    const reaction = message.reactions[reactionIndex];
    const userIndex = reaction.reactedBy.indexOf(action.input.senderId);

    if (userIndex !== -1) {
      // Remove user from reaction
      reaction.reactedBy.splice(userIndex, 1);

      // Remove entire reaction if no users left
      if (reaction.reactedBy.length === 0) {
        message.reactions.splice(reactionIndex, 1);
      }
    }
  },

  editChatNameOperation(state, action) {
    state.name = action.input.name || "";
  },

  editChatDescriptionOperation(state, action) {
    state.description = action.input.description || "";
  },
};