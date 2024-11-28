import Editor from "./editor";
import { createDocumentStory } from "document-model-libs/utils";

import * as ChatRoomModule from "../../document-models/chat-room";

const { meta, CreateDocumentStory: ChatRoom } = createDocumentStory(
  Editor,
  ChatRoomModule.reducer,
  ChatRoomModule.utils.createDocument({
    state: {
      local: {},
      global: {
        messages: [
          {
            id: "1",
            content: "Hello",
            sender: {
              id: "0x1234567890",
              name: "Alice",
              avatarUrl:
                "https://www.shutterstock.com/image-vector/cute-cartoon-cat-profile-avatar-600nw-2432356437.jpg",
            },
            sentAt: "2021-09-01T00:00:00.000Z",
            reactions: [],
          },
          {
            id: "2",
            content: "Hi",
            sender: {
              id: "0x0987654321",
              name: "Bob",
              avatarUrl:
                "https://cdn.pixabay.com/photo/2023/05/08/09/33/cat-7978052_1280.jpg",
            },
            sentAt: "2021-09-01T00:00:00.000Z",
            reactions: [],
          },
          {
            id: "3",
            content: "Meow",
            sender: {
              id: "0x1234567891",
              name: "Rover",
              avatarUrl:
                "https://imgcdn.stablediffusionweb.com/2024/9/26/5a211436-233b-4cbc-88ce-e087607930a0.jpg",
            },
            sentAt: "2021-09-01T00:00:00.000Z",
            reactions: [
              {
                id: "0001",
                reactedBy: ["0x1234567890", "0x0987654321"],
                type: "LAUGH",
              },
            ],
          },
        ],
        name: "Cats Chat Room",
        id: "chat-room",
        createdBy: "0x1234567890",
        createdAt: new Date().toISOString(),
        description: "This is a chat room for cats!!!",
      },
    },
  }),
);
export { ChatRoom };

export default { ...meta, title: "Chat Room Editor" };
