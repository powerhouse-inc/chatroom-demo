import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  description: "A chat room document model for managing messages and reactions",
  extension: "phcr",
  id: "powerhouse/chat-room",
  name: "ChatRoom",
  specifications: [
    {
      changeLog: [],
      modules: [
        {
          id: "messages",
          name: "messages",
          description: "Operations for managing chat messages",
          operations: [
            {
              id: "add-message",
              name: "ADD_MESSAGE",
              description: "Add a new message to the chat room",
              schema:
                "input AddMessageInput {\n  messageId: OID!\n  sender: SenderInput!\n  content: String!\n  sentAt: DateTime!\n}\n\ninput SenderInput {\n  id: ID!\n  name: String\n  avatarUrl: URL\n}",
              template: "Add a new message to the chat room",
              reducer:
                'if (action.input.content === "") {\n  throw new MessageContentCannotBeEmptyError();\n}\n\nconst newMessage = {\n  id: action.input.messageId,\n  sender: {\n    id: action.input.sender.id,\n    name: action.input.sender.name || null,\n    avatarUrl: action.input.sender.avatarUrl || null,\n  },\n  content: action.input.content,\n  sentAt: action.input.sentAt,\n  reactions: [],\n};\n\nstate.messages.push(newMessage);',
              errors: [
                {
                  id: "message-content-empty",
                  name: "MessageContentCannotBeEmptyError",
                  code: "MESSAGE_CONTENT_CANNOT_BE_EMPTY",
                  description: "Message content cannot be empty",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "add-emoji-reaction",
              name: "ADD_EMOJI_REACTION",
              description: "Add an emoji reaction to a message",
              schema:
                "input AddEmojiReactionInput {\n  messageId: OID!\n  reactedBy: ID!\n  type: ReactionType!\n}",
              template: "Add an emoji reaction to a message",
              reducer:
                "const message = state.messages.find(m => m.id === action.input.messageId);\nif (!message) {\n  throw new MessageNotFoundError(`Message with ID ${action.input.messageId} not found`);\n}\n\nif (!message.reactions) {\n  message.reactions = [];\n}\n\nconst existingReaction = message.reactions.find(r => r.type === action.input.type);\n\nif (existingReaction) {\n  if (!existingReaction.reactedBy.includes(action.input.reactedBy)) {\n    existingReaction.reactedBy.push(action.input.reactedBy);\n  }\n} else {\n  message.reactions.push({\n    type: action.input.type,\n    reactedBy: [action.input.reactedBy]\n  });\n}",
              errors: [
                {
                  id: "message-not-found",
                  name: "MessageNotFoundError",
                  code: "MESSAGE_NOT_FOUND",
                  description: "The specified message does not exist",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "remove-emoji-reaction",
              name: "REMOVE_EMOJI_REACTION",
              description: "Remove an emoji reaction from a message",
              schema:
                "input RemoveEmojiReactionInput {\n  messageId: OID!\n  senderId: ID!\n  type: ReactionType!\n}",
              template: "Remove an emoji reaction from a message",
              reducer:
                "const message = state.messages.find(m => m.id === action.input.messageId);\nif (!message) {\n  throw new MessageNotFoundError(`Message with ID ${action.input.messageId} not found`);\n}\n\nif (!message.reactions) {\n  return;\n}\n\nconst reactionIndex = message.reactions.findIndex(r => r.type === action.input.type);\nif (reactionIndex === -1) {\n  return;\n}\n\nconst reaction = message.reactions[reactionIndex];\nconst userIndex = reaction.reactedBy.indexOf(action.input.senderId);\n\nif (userIndex !== -1) {\n  reaction.reactedBy.splice(userIndex, 1);\n  \n  if (reaction.reactedBy.length === 0) {\n    message.reactions.splice(reactionIndex, 1);\n  }\n}",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "settings",
          name: "settings",
          description: "Operations for managing chat room settings",
          operations: [
            {
              id: "edit-chat-name",
              name: "EDIT_CHAT_NAME",
              description: "Update the chat room name",
              schema: "input EditChatNameInput {\n  name: String\n}",
              template: "Update the chat room name",
              reducer: 'state.name = action.input.name || "";',
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "edit-chat-description",
              name: "EDIT_CHAT_DESCRIPTION",
              description: "Update the chat room description",
              schema:
                "input EditChatDescriptionInput {\n  description: String\n}",
              template: "Update the chat room description",
              reducer: 'state.description = action.input.description || "";',
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
      state: {
        global: {
          examples: [],
          initialValue:
            '{\n  "id": "",\n  "name": "",\n  "description": null,\n  "createdAt": null,\n  "createdBy": null,\n  "messages": []\n}',
          schema:
            "type ChatRoomState {\n  id: OID!\n  name: String!\n  description: String\n  createdAt: DateTime\n  createdBy: ID\n  messages: [Message!]!\n}\n\ntype Message {\n  id: OID!\n  sender: Sender!\n  content: String\n  sentAt: DateTime!\n  reactions: [Reaction!]\n}\n\ntype Sender {\n  id: ID!\n  name: String\n  avatarUrl: URL\n}\n\ntype Reaction {\n  type: ReactionType!\n  reactedBy: [ID!]!\n}\n\nenum ReactionType {\n  THUMBS_UP\n  THUMBS_DOWN\n  LAUGH\n  HEART\n  CRY\n}",
        },
        local: {
          examples: [],
          initialValue: "",
          schema: "",
        },
      },
      version: 1,
    },
  ],
};
