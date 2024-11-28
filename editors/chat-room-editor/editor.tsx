/* eslint-disable react/jsx-no-bind */
import { EditorProps } from "document-model/document";
import {
  ChatRoomState,
  ChatRoomAction,
  ChatRoomLocalState,
  Message,
  ReactionType,
  actions,
} from "../../document-models/chat-room";
import { utils as documentModelUtils } from "document-model/document";
import { Button } from "@powerhousedao/design-system";
import {
  ChatRoom,
  ChatRoomProps,
  MessageProps,
  reactionMap,
} from "./components";

export type IProps = EditorProps<
  ChatRoomState,
  ChatRoomAction,
  ChatRoomLocalState
>;

const reactionTypeToEmoji = (reactionType: ReactionType): string => {
  switch (reactionType) {
    case "HEART":
      return "❤️";
    case "THUMBS_UP":
      return "👍";
    case "THUMBS_DOWN":
      return "👎";
    case "LAUGH":
      return "😂";
    case "CRY":
      return "😢";
    default:
      return "❤️";
  }
};

const reactionTypeToReactionKey = (
  reactionType: ReactionType,
): keyof typeof reactionMap => {
  switch (reactionType) {
    case "HEART":
      return "heart";
    case "THUMBS_UP":
      return "thumbsUp";
    case "THUMBS_DOWN":
      return "thumbsDown";
    case "LAUGH":
      return "laughing";
    case "CRY":
      return "cry";
    default:
      return "heart";
  }
};

const reactionKeyToReactionType = (reactionKey: string): ReactionType => {
  switch (reactionKey) {
    case "heart":
      return "HEART";
    case "thumbsUp":
      return "THUMBS_UP";
    case "thumbsDown":
      return "THUMBS_DOWN";
    case "laughing":
      return "LAUGH";
    case "cry":
      return "CRY";
    default:
      return "HEART";
  }
};

export default function Editor(props: IProps) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

  const onSendMessage: ChatRoomProps["onSendMessage"] = (message) => {
    props.dispatch(
      actions.addMessage({
        messageId: documentModelUtils.hashKey(),
        content: message,
        sender: {
          id: props.context.user?.address || "anon-user",
          name: props.context.user?.ens?.name || "Anon User",
          avatarUrl: props.context.user?.ens?.avatarUrl || null,
        },
        sentAt: new Date().toISOString(),
      }),
    );
  };

  const mapReactions = (
    reactions: Message["reactions"],
  ): MessageProps["reactions"] => {
    return (reactions || [])
      .map((reaction) => ({
        emoji: reactionTypeToEmoji(reaction.type),
        reactedBy: reaction.reactedBy,
        type: reactionTypeToReactionKey(reaction.type),
      }))
      .filter((reaction) => reaction.reactedBy.length > 0);
  };

  const messages: ChatRoomProps["messages"] =
    props.document.state.global.messages.map((message) => ({
      id: message.id,
      message: message.content || "",
      timestamp: message.sentAt,
      userName: message.sender.name || message.sender.id,
      imgUrl: message.sender.avatarUrl || undefined,
      isCurrentUser: message.sender.id === props.context.user?.address,
      reactions: mapReactions(message.reactions),
    }));

  const addReaction = (
    messageId: string,
    userId: string,
    reactionType: ReactionType,
  ) => {
    props.dispatch(
      actions.addEmojiReaction({
        messageId,
        reactedBy: userId,
        type: reactionType,
      }),
    );
  };

  const removeReaction = (
    messageId: string,
    userId: string,
    reactionType: ReactionType,
  ) => {
    props.dispatch(
      actions.removeEmojiReaction({
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
    const currentUserId = props.context.user?.address || "anon-user";

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

  return (
    <div>
      <ChatRoom
        description={props.document.state.global.description || undefined}
        messages={messages}
        onClickReaction={onClickReaction}
        onSendMessage={onSendMessage}
        title={props.document.state.global.name}
      />
    </div>
  );
}
