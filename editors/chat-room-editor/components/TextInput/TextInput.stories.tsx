import type { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  argTypes: {
    onSendMessage: { action: "sendMessage" },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Primary: Story = {
  args: {
    onSendMessage: (message) => console.log("onSendMessage", message),
  },
};
