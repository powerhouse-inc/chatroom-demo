import { baseActions } from "document-model";
import { generalOperationsActions } from "./gen/creators.js";

/** Actions for the ChatRoom document model */
export const actions = { ...baseActions, ...generalOperationsActions };
