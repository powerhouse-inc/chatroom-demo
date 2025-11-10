import { generateId } from "document-model/core";
import { useUser } from "@powerhousedao/reactor-browser/connect";
import { useSelectedChatRoomDocument } from "../../document-models/chat-room/hooks.js";
import {
  addMessage,
  addEmojiReaction,
  removeEmojiReaction,
  editChatName,
  editChatDescription,
} from "../../document-models/chat-room/gen/creators.js";
import {
  ChatRoom,
  type ChatRoomProps,
  type MessageProps,
} from "./components/index.js";
import { reactionKeyToReactionType, mapReactions } from "./utils.js";

export default function Editor() {
  const [document, dispatch] = useSelectedChatRoomDocument();
  const user = useUser();

  const disableChatRoom = !user;

  if (!document) {
    return <div>Loading...</div>;
  }

  const messages: ChatRoomProps["messages"] =
    document.state.global.messages.map((message) => ({
      id: message.id,
      message: message.content || "",
      timestamp: message.sentAt,
      userName: message.sender.name || message.sender.id,
      imgUrl: message.sender.avatarUrl || undefined,
      isCurrentUser: message.sender.id === user?.address,
      reactions: mapReactions(message.reactions),
    }));

  const onSendMessage: ChatRoomProps["onSendMessage"] = (message) => {
    if (!message) {
      return;
    }

    dispatch(
      addMessage({
        messageId: generateId(),
        content: message,
        sender: {
          id: user?.address || "anon-user",
          name: user?.ens?.name || null,
          avatarUrl: user?.ens?.avatarUrl || null,
        },
        sentAt: new Date().toISOString(),
      }),
    );
  };

  const addReaction = (
    messageId: string,
    userId: string,
    reactionType: "HEART" | "THUMBS_UP" | "THUMBS_DOWN" | "LAUGH" | "CRY",
  ) => {
    dispatch(
      addEmojiReaction({
        messageId,
        reactedBy: userId,
        type: reactionType,
      }),
    );
  };

  const removeReaction = (
    messageId: string,
    userId: string,
    reactionType: "HEART" | "THUMBS_UP" | "THUMBS_DOWN" | "LAUGH" | "CRY",
  ) => {
    dispatch(
      removeEmojiReaction({
        messageId,
        senderId: userId,
        type: reactionType,
      }),
    );
  };

  const onClickReaction: MessageProps["onClickReaction"] = (reaction) => {
    const message = messages.find(
      (message) => message.id === reaction.messageId,
    );

    if (!message) {
      return;
    }

    const messageId = reaction.messageId;
    const reactionType = reactionKeyToReactionType(reaction.type);
    const currentUserId = user?.address || "anon-user";

    const existingReaction = message.reactions?.find(
      (r) => r.type === reaction.type,
    );

    if (existingReaction) {
      const dispatchAction = existingReaction.reactedBy.includes(currentUserId)
        ? removeReaction
        : addReaction;

      dispatchAction(messageId, currentUserId, reactionType);
    } else {
      addReaction(messageId, currentUserId, reactionType);
    }
  };

  const onSubmitTitle: ChatRoomProps["onSubmitTitle"] = (title) => {
    dispatch(editChatName({ name: title }));
  };

  const onSubmitDescription: ChatRoomProps["onSubmitDescription"] = (
    description,
  ) => {
    dispatch(editChatDescription({ description }));
  };

  return (
    <div
      style={{
        height: "calc(100vh - 140px)",
      }}
    >
      <ChatRoom
        description={
          document.state.global.description || "This is a chat room demo"
        }
        disabled={disableChatRoom}
        messages={messages}
        onClickReaction={onClickReaction}
        onSendMessage={onSendMessage}
        onSubmitDescription={onSubmitDescription}
        onSubmitTitle={onSubmitTitle}
        title={document.state.global.name || "Chat Room Demo"}
      />
    </div>
  );
}
