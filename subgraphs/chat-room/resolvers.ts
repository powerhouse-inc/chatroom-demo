import type { BaseSubgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import { setName } from "document-model";
import {
  actions,
  chatRoomDocumentType,
} from "@powerhousedao/chatroom-package/document-models/chat-room";

import type {
  ChatRoomDocument,
  AddMessageInput,
  AddEmojiReactionInput,
  RemoveEmojiReactionInput,
  EditChatNameInput,
  EditChatDescriptionInput,
} from "@powerhousedao/chatroom-package/document-models/chat-room";

export const getResolvers = (
  subgraph: BaseSubgraph,
): Record<string, unknown> => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      ChatRoom: async () => {
        return {
          getDocument: async (args: { docId: string; driveId: string }) => {
            const { docId, driveId } = args;

            if (!docId) {
              throw new Error("Document id is required");
            }

            if (driveId) {
              const docIds = await reactor.getDocuments(driveId);
              if (!docIds.includes(docId)) {
                throw new Error(
                  `Document with id ${docId} is not part of ${driveId}`,
                );
              }
            }

            const doc = await reactor.getDocument<ChatRoomDocument>(docId);
            return {
              driveId: driveId,
              ...doc,
              ...doc.header,
              created: doc.header.createdAtUtcIso,
              lastModified: doc.header.lastModifiedAtUtcIso,
              state: doc.state.global,
              stateJSON: doc.state.global,
              revision: doc.header?.revision?.global ?? 0,
            };
          },
          getDocuments: async (args: { driveId: string }) => {
            const { driveId } = args;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc = await reactor.getDocument<ChatRoomDocument>(docId);
                return {
                  driveId: driveId,
                  ...doc,
                  ...doc.header,
                  created: doc.header.createdAtUtcIso,
                  lastModified: doc.header.lastModifiedAtUtcIso,
                  state: doc.state.global,
                  stateJSON: doc.state.global,
                  revision: doc.header?.revision?.global ?? 0,
                };
              }),
            );

            return docs.filter(
              (doc) => doc.header.documentType === chatRoomDocumentType,
            );
          },
        };
      },
    },
    Mutation: {
      ChatRoom_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string },
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument(chatRoomDocumentType);

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: chatRoomDocumentType,
            }),
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      ChatRoom_addMessage: async (
        _: unknown,
        args: { docId: string; input: AddMessageInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ChatRoomDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addMessage(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addMessage");
        }

        return true;
      },

      ChatRoom_addEmojiReaction: async (
        _: unknown,
        args: { docId: string; input: AddEmojiReactionInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ChatRoomDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addEmojiReaction(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addEmojiReaction",
          );
        }

        return true;
      },

      ChatRoom_removeEmojiReaction: async (
        _: unknown,
        args: { docId: string; input: RemoveEmojiReactionInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ChatRoomDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeEmojiReaction(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to removeEmojiReaction",
          );
        }

        return true;
      },

      ChatRoom_editChatName: async (
        _: unknown,
        args: { docId: string; input: EditChatNameInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ChatRoomDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.editChatName(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to editChatName");
        }

        return true;
      },

      ChatRoom_editChatDescription: async (
        _: unknown,
        args: { docId: string; input: EditChatDescriptionInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ChatRoomDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.editChatDescription(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to editChatDescription",
          );
        }

        return true;
      },
    },
  };
};
