/**
 * Factory methods for creating ChatRoomDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model/core";
import type {
  ChatRoomDocument,
  ChatRoomLocalState,
  ChatRoomGlobalState,
  ChatRoomPHState,
} from "./types.js";
import { createDocument } from "./utils.js";

export function defaultGlobalState(): ChatRoomGlobalState {
  return {
    id: "",
    name: "",
    description: null,
    createdAt: null,
    createdBy: null,
    messages: [],
  };
}

export function defaultLocalState(): ChatRoomLocalState {
  return {};
}

export function defaultPHState(): ChatRoomPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ChatRoomGlobalState>,
): ChatRoomGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as ChatRoomGlobalState;
}

export function createLocalState(
  state?: Partial<ChatRoomLocalState>,
): ChatRoomLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ChatRoomLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ChatRoomGlobalState>,
  localState?: Partial<ChatRoomLocalState>,
): ChatRoomPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ChatRoomDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createChatRoomDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ChatRoomGlobalState>;
    local?: Partial<ChatRoomLocalState>;
  }>,
): ChatRoomDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
