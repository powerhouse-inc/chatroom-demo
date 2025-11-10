import type { DocumentModelModule } from "document-model";
import { ChatRoom } from "./chat-room/module.js";

export const documentModels: DocumentModelModule<any>[] = [ChatRoom];
