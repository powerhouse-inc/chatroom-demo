export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Address: { input: `${string}:0x${string}`; output: `${string}:0x${string}` };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Attachment: { input: string; output: string };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Unknown: { input: unknown; output: unknown };
  Upload: { input: File; output: File };
};

export type AddEmojiReactionInput = {
  messageId: Scalars["OID"]["input"];
  reactedBy: Scalars["ID"]["input"];
  type: ReactionType;
};

export type AddMessageInput = {
  content: Scalars["String"]["input"];
  messageId: Scalars["OID"]["input"];
  sender: SenderInput;
  sentAt: Scalars["DateTime"]["input"];
};

export type ChatRoomState = {
  createdAt: Maybe<Scalars["DateTime"]["output"]>;
  createdBy: Maybe<Scalars["ID"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  messages: Array<Message>;
  name: Scalars["String"]["output"];
};

export type EditChatDescriptionInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditChatNameInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Message = {
  content: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  reactions: Maybe<Array<Reaction>>;
  sender: Sender;
  sentAt: Scalars["DateTime"]["output"];
};

export type Reaction = {
  reactedBy: Array<Scalars["ID"]["output"]>;
  type: ReactionType;
};

export type ReactionType =
  | "CRY"
  | "HEART"
  | "LAUGH"
  | "THUMBS_DOWN"
  | "THUMBS_UP";

export type RemoveEmojiReactionInput = {
  messageId: Scalars["OID"]["input"];
  senderId: Scalars["ID"]["input"];
  type: ReactionType;
};

export type Sender = {
  avatarUrl: Maybe<Scalars["URL"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
};

export type SenderInput = {
  avatarUrl?: InputMaybe<Scalars["URL"]["input"]>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};
