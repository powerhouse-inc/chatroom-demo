import { EditorProps } from "document-model/document";
import {
  ChatRoomState,
  ChatRoomAction,
  ChatRoomLocalState,
  actions,
} from "../../document-models/chat-room";
import { utils as documentModelUtils } from "document-model/document";
import { Button } from "@powerhousedao/design-system";

export type IProps = EditorProps<
  ChatRoomState,
  ChatRoomAction,
  ChatRoomLocalState
>;

export default function Editor(props: IProps) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

  return (
    <div>
      <Button onClick={() => console.log("Hello world!")}>My Button</Button>
    </div>
  );
}
