import type { Meta, StoryObj } from "@storybook/react";

import { Reaction } from "./Reaction";

const meta: Meta<typeof Reaction> = {
  component: Reaction,
  argTypes: {
    bgColor: { control: "color" },
    textColor: { control: "color" },
    onClick: { action: "clicked" },
    reaction: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof Reaction>;

export const Primary: Story = {
  args: {
    bgColor: "#7678ed",
    textColor: "black",
    reaction: {
      type: "thumbsUp",
      emoji: "👍",
      reactedBy: ["0x1234567890", "0x0987654321", "0x1234567891"],
    },
    onClick: () => console.log("clicked"),
  },
};