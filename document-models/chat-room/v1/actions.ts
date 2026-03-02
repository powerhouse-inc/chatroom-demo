import { baseActions } from "document-model";
import { messagesActions, settingsActions } from "./gen/creators.js";

/** Actions for the ChatRoom document model */

export const actions = {
  ...baseActions,
  ...messagesActions,
  ...settingsActions,
};
