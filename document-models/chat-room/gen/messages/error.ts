export type ErrorCode =
  | "MessageContentCannotBeEmptyError"
  | "MessageNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class MessageContentCannotBeEmptyError
  extends Error
  implements ReducerError
{
  errorCode = "MessageContentCannotBeEmptyError" as ErrorCode;
  constructor(message = "MessageContentCannotBeEmptyError") {
    super(message);
  }
}

export class MessageNotFoundError extends Error implements ReducerError {
  errorCode = "MessageNotFoundError" as ErrorCode;
  constructor(message = "MessageNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddMessage: {
    MessageContentCannotBeEmptyError,
  },
  AddEmojiReaction: {
    MessageNotFoundError,
  },
};
