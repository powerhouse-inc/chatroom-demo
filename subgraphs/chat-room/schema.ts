import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Queries: ChatRoom Document
  """
  type ChatRoomQueries {
    getDocument(docId: PHID!, driveId: PHID): ChatRoom
    getDocuments(driveId: String!): [ChatRoom!]
  }

  type Query {
    ChatRoom: ChatRoomQueries
  }

  """
  Mutations: ChatRoom
  """
  type Mutation {
    ChatRoom_createDocument(name: String!, driveId: String): String

    ChatRoom_addMessage(
      driveId: String
      docId: PHID
      input: ChatRoom_AddMessageInput
    ): Int
    ChatRoom_addEmojiReaction(
      driveId: String
      docId: PHID
      input: ChatRoom_AddEmojiReactionInput
    ): Int
    ChatRoom_removeEmojiReaction(
      driveId: String
      docId: PHID
      input: ChatRoom_RemoveEmojiReactionInput
    ): Int
    ChatRoom_editChatName(
      driveId: String
      docId: PHID
      input: ChatRoom_EditChatNameInput
    ): Int
    ChatRoom_editChatDescription(
      driveId: String
      docId: PHID
      input: ChatRoom_EditChatDescriptionInput
    ): Int
  }

  """
  Module: GeneralOperations
  """
  input ChatRoom_AddMessageInput {
    messageId: OID!
    sender: ChatRoom_SenderInput!
    content: String!
    sentAt: DateTime!
  }

  input ChatRoom_SenderInput {
    id: ID!
    name: String
    avatarUrl: URL
  }
  input ChatRoom_AddEmojiReactionInput {
    messageId: OID! # ID of the message to react to
    reactedBy: ID! # ID of the user adding the reaction
    type: ChatRoom_ReactionType! # Type of the reaction (emoji)
  }
  input ChatRoom_RemoveEmojiReactionInput {
    messageId: OID! # ID of the message to remove reaction from
    senderId: ID! # ID of the user removing the reaction
    type: ChatRoom_ReactionType! # Type of the reaction (emoji)
  }
  input ChatRoom_EditChatNameInput {
    name: String
  }
  input ChatRoom_EditChatDescriptionInput {
    description: String
  }
`;
