import type {
  MessageProps,
  ReactionMap,
} from "./components/Message/Message.js";
import type {
  Message,
  ReactionType,
} from "../../document-models/chat-room/v1/gen/schema/types.js";

const emojis = [
  "😀",
  "😂",
  "🤣",
  "😍",
  "😎",
  "😊",
  "🙃",
  "😇",
  "🤔",
  "🥳",
  "🤯",
  "🤗",
  "😱",
  "👻",
  "🎃",
  "🐱",
  "🐶",
  "🐹",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐝",
  "🐞",
  "🐟",
  "🐬",
  "🐳",
  "🦋",
  "🌺",
  "🌸",
  "🌼",
  "🍀",
];

export function getEmojiFromString(input: string): string {
  function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  const hash = hashString(input);
  return emojis[hash % emojis.length];
}

export const reactionTypeToEmoji = (reactionType: ReactionType): string => {
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

export const reactionTypeToReactionKey = (
  reactionType: ReactionType,
): keyof ReactionMap => {
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

export const reactionKeyToReactionType = (
  reactionKey: string,
): ReactionType => {
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

export const mapReactions = (
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
