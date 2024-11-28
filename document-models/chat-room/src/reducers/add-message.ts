/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { ChatRoomAddMessageOperations } from "../../gen/add-message/operations";

export const reducer: ChatRoomAddMessageOperations = {
  addMessageOperation(state, action, dispatch) {
    // TODO: Implement "addMessageOperation" reducer
    throw new Error('Reducer "addMessageOperation" not yet implemented');
  },
  addEmojiReactionOperation(state, action, dispatch) {
    // TODO: Implement "addEmojiReactionOperation" reducer
    throw new Error('Reducer "addEmojiReactionOperation" not yet implemented');
  },
  removeEmojiReactionOperation(state, action, dispatch) {
    // TODO: Implement "removeEmojiReactionOperation" reducer
    throw new Error(
      'Reducer "removeEmojiReactionOperation" not yet implemented',
    );
  },
};
